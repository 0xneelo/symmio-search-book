#!/usr/bin/env bash
set -euo pipefail

# One-shot local bring-up for symmio-search-book:
#   1. start the static reader (8890) + answer-engine service (8891)
#   2. wire the reader to the service (?service=...)
#   3. print the URLs to open
#
# Usage:
#   ./up.sh                          # defaults :8890 / :8891
#   STATIC_PORT=9000 SERVICE_PORT=9001 ./up.sh
#   UP_ON_CONFLICT=kill ./up.sh      # non-interactive port takeover
#
# LLM mode: if .secrets/search-book.env exists it is loaded via node
# --env-file (never printed) and the service answers in live LLM mode.
# Without it the service still runs, extractive-only.
#
# Ports 8000/8787 are used by onboarding-app locally, and 8788 is the
# repo's own historical static default — this launcher stays clear of all
# three by defaulting to 8890/8891.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

STATIC_PORT="${STATIC_PORT:-8890}"
SERVICE_PORT="${SERVICE_PORT:-8891}"
SECRETS_FILE="${SECRETS_FILE:-.secrets/search-book.env}"
DB_PATH="${SEARCH_BOOK_ANSWER_ENGINE_DB:-_local/answer-engine.sqlite}"
LOG_DIR="_local/logs"
STATIC_LOG="${LOG_DIR}/static.log"
SERVICE_LOG="${LOG_DIR}/service.log"

say() { printf '\n\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }

# port helpers — ss + /proc on Linux/WSL, lsof + ps on macOS
if command -v ss >/dev/null 2>&1; then
  port_busy()    { ss -ltn "sport = :$1" 2>/dev/null | grep -q LISTEN; }
  pids_on_port() { ss -ltnp "sport = :$1" 2>/dev/null | grep -oE 'pid=[0-9]+' | cut -d= -f2 | sort -u; }
  proc_cwd()     { readlink "/proc/$1/cwd" 2>/dev/null || echo '?'; }
  proc_cmd()     { tr '\0' ' ' < "/proc/$1/cmdline" 2>/dev/null; }
else
  port_busy()    { lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1; }
  pids_on_port() { lsof -nP -iTCP:"$1" -sTCP:LISTEN -t 2>/dev/null | sort -u; }
  proc_cwd()     { local d; d="$(lsof -a -p "$1" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1)"; printf '%s' "${d:-?}"; }
  proc_cmd()     { ps -p "$1" -o command= 2>/dev/null; }
fi
next_free_port() { local p="$1"; while port_busy "$p"; do p=$((p + 1)); done; printf '%s' "$p"; }
describe_port() {
  local port="$1" pid cmd
  for pid in $(pids_on_port "$port"); do
    cmd="$(proc_cmd "$pid")"
    printf '       :%s  pid %s  cwd=%s  (%s)\n' "$port" "$pid" "$(proc_cwd "$pid")" "${cmd% }"
  done
}

# --- toolchain: node >= 22.5 (nvm-aware) -----------------------------------
if ! command -v node >/dev/null 2>&1; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  # shellcheck source=/dev/null
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null 2>&1 || true
fi
command -v node >/dev/null 2>&1 || { warn "node not found (is nvm installed?)"; exit 1; }

mkdir -p "$LOG_DIR" "$(dirname "$DB_PATH")"

# --- handle an instance already running on the requested ports -------------
if port_busy "$STATIC_PORT" || port_busy "$SERVICE_PORT"; then
  warn "Something is already listening on the requested ports:"
  port_busy "$STATIC_PORT"  && describe_port "$STATIC_PORT"
  port_busy "$SERVICE_PORT" && describe_port "$SERVICE_PORT"

  alt_static="$(next_free_port $((STATIC_PORT + 1)))"
  alt_service="$(next_free_port $((SERVICE_PORT + 1)))"
  [ "$alt_service" = "$alt_static" ] && alt_service="$(next_free_port $((alt_static + 1)))"

  choice="${UP_ON_CONFLICT:-}"
  if [ -z "$choice" ]; then
    if [ -t 0 ]; then
      printf '\n  [K] Kill whatever holds the ports and launch here (:%s / :%s)\n' "$STATIC_PORT" "$SERVICE_PORT"
      printf   '  [N] Leave it; launch on the next free ports        (:%s / :%s)\n' "$alt_static" "$alt_service"
      printf   '  [C] Cancel\n'
      printf 'Choose [K/N/C]: '
      read -r choice || choice="c"
    else
      warn "Ports busy and no terminal to prompt."
      warn "Re-run with UP_ON_CONFLICT=kill (take over) or UP_ON_CONFLICT=new (free ports)."
      exit 1
    fi
  fi

  case "$(printf '%s' "$choice" | tr '[:upper:]' '[:lower:]')" in
    k|kill)
      say "Stopping listeners on :${STATIC_PORT} and :${SERVICE_PORT} ..."
      for port in "$STATIC_PORT" "$SERVICE_PORT"; do
        for pid in $(pids_on_port "$port"); do kill "$pid" 2>/dev/null || true; done
      done
      for _ in $(seq 1 12); do
        port_busy "$STATIC_PORT" || port_busy "$SERVICE_PORT" || break
        sleep 0.5
      done
      for port in "$STATIC_PORT" "$SERVICE_PORT"; do
        if port_busy "$port"; then
          for pid in $(pids_on_port "$port"); do kill -9 "$pid" 2>/dev/null || true; done
        fi
      done
      sleep 1
      if port_busy "$STATIC_PORT" || port_busy "$SERVICE_PORT"; then
        warn "Could not free :${STATIC_PORT}/:${SERVICE_PORT}; something is still holding them."; exit 1
      fi
      ;;
    n|new)
      STATIC_PORT="$alt_static"; SERVICE_PORT="$alt_service"
      say "Leaving the running instance up; using free ports :${STATIC_PORT} / :${SERVICE_PORT}"
      ;;
    *)
      say "Cancelled — nothing was touched."
      exit 0
      ;;
  esac
fi

# --- answer-engine service (LLM mode when secrets exist) --------------------
NODE_ENV_ARGS=()
MODE_LABEL="extractive-only (no ${SECRETS_FILE})"
if [ -f "$SECRETS_FILE" ]; then
  NODE_ENV_ARGS=(--env-file="$SECRETS_FILE")
  MODE_LABEL="live LLM (keys loaded from ${SECRETS_FILE}, never printed)"
fi

say "Starting answer-engine service :${SERVICE_PORT} — ${MODE_LABEL}"
SEARCH_BOOK_ANSWER_ENGINE_PORT="$SERVICE_PORT" \
SEARCH_BOOK_ANSWER_ENGINE_DB="$DB_PATH" \
  node ${NODE_ENV_ARGS[@]+"${NODE_ENV_ARGS[@]}"} scripts/serve-answer-engine.mjs >"$SERVICE_LOG" 2>&1 &
SERVICE_PID=$!

say "Starting static reader :${STATIC_PORT}"
SEARCH_BOOK_STATIC_PORT="$STATIC_PORT" \
  node scripts/serve-static-preview.mjs >"$STATIC_LOG" 2>&1 &
STATIC_PID=$!

cleanup() { kill "$SERVICE_PID" "$STATIC_PID" 2>/dev/null || true; }
trap cleanup INT TERM

# --- wait for both to answer ------------------------------------------------
ok=0
for _ in $(seq 1 30); do
  kill -0 "$SERVICE_PID" 2>/dev/null || break
  if curl -fsS --max-time 2 "http://127.0.0.1:${SERVICE_PORT}/health" >/dev/null 2>&1; then ok=1; break; fi
  sleep 1
done
if [ "$ok" != 1 ]; then
  warn "answer-engine did not come up on :${SERVICE_PORT} (see ${SERVICE_LOG}):"
  tail -n 15 "$SERVICE_LOG" >&2 || true
  cleanup; exit 1
fi

ok=0
for _ in $(seq 1 15); do
  kill -0 "$STATIC_PID" 2>/dev/null || break
  if curl -fsS --max-time 2 "http://127.0.0.1:${STATIC_PORT}/" >/dev/null 2>&1; then ok=1; break; fi
  sleep 1
done
if [ "$ok" != 1 ]; then
  warn "static reader did not come up on :${STATIC_PORT} (see ${STATIC_LOG}):"
  tail -n 15 "$STATIC_LOG" >&2 || true
  cleanup; exit 1
fi

# --- banner ------------------------------------------------------------------
cat <<BANNER

============================================================
  symmio-search-book is UP   (${MODE_LABEL})
------------------------------------------------------------
  Reader (service-wired) : http://127.0.0.1:${STATIC_PORT}/?service=http://127.0.0.1:${SERVICE_PORT}
  Reader (static only)   : http://127.0.0.1:${STATIC_PORT}/
  Ask API                : POST http://127.0.0.1:${SERVICE_PORT}/api/search-book/answer
  Health                 : http://127.0.0.1:${SERVICE_PORT}/health
  SQLite datastore       : ${DB_PATH}
============================================================
  Logs: ${SERVICE_LOG} · ${STATIC_LOG}     (Ctrl-C stops both)

BANNER

wait "$SERVICE_PID" "$STATIC_PID"
