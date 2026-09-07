import clampNumericValue from './clampNumericValue.js';
import getIconLibraryNames from './getIconLibraryNames.js';
import splitIconNameWords from './splitIconNameWords.js';

const readIconTraitValues = (iconComponent) => {
  const attributeRecord = iconComponent.getAttributes();
  const libraryNames = getIconLibraryNames();
  const requestedName = String(attributeRecord['data-db-icon-name'] || 'star');
  const iconName = libraryNames.indexOf(requestedName) >= 0 ? requestedName : 'star';
  const isDecorative = String(attributeRecord['data-db-icon-decorative']) === 'true';
  const writtenLabel = String(attributeRecord['data-db-icon-label'] || '').trim();
  return {
    iconName,
    size: clampNumericValue(attributeRecord['data-db-icon-size'], 12, 96, 24),
    strokeWidth: clampNumericValue(attributeRecord['data-db-icon-stroke'], 1, 3, 1.75),
    isDecorative,
    accessibleLabel: isDecorative ? '' : writtenLabel || splitIconNameWords(iconName),
    color: String(attributeRecord['data-db-icon-color'] || '').trim(),
  };
};

export default readIconTraitValues;
