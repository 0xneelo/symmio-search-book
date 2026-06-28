export const COMPENDIUM_TARGET_MIN = 500;
export const COMPENDIUM_TARGET_MAX = 800;
export const COMPENDIUM_TARGET_LABEL = `${COMPENDIUM_TARGET_MIN}-${COMPENDIUM_TARGET_MAX} pages`;

export function withinCompendiumPageTarget(pageCount) {
  return pageCount >= COMPENDIUM_TARGET_MIN && pageCount <= COMPENDIUM_TARGET_MAX;
}

export function assertCompendiumPageTarget(pageCount, context = "Manifest page count") {
  if (!withinCompendiumPageTarget(pageCount)) {
    throw new Error(`${context} ${pageCount} outside ${COMPENDIUM_TARGET_LABEL} target`);
  }
}

export function compendiumTargetFields(currentManifestPages) {
  return {
    requestedRange: COMPENDIUM_TARGET_LABEL,
    minimumPages: COMPENDIUM_TARGET_MIN,
    maximumPages: COMPENDIUM_TARGET_MAX,
    currentManifestPages,
  };
}
