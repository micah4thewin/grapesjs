import clampNumericValue from './clampNumericValue.js';
import getIconLibraryNames from './getIconLibraryNames.js';

const readIconTraitValues = (iconComponent) => {
  const attributeRecord = iconComponent.getAttributes();
  const libraryNames = getIconLibraryNames();
  const requestedName = String(attributeRecord['data-db-icon-name'] || 'star');
  return {
    iconName: libraryNames.indexOf(requestedName) >= 0 ? requestedName : 'star',
    size: clampNumericValue(attributeRecord['data-db-icon-size'], 12, 96, 24),
    strokeWidth: clampNumericValue(attributeRecord['data-db-icon-stroke'], 1, 3, 1.75),
    isDecorative: attributeRecord['data-db-icon-decorative'] === 'true',
    accessibleLabel: String(attributeRecord['data-db-icon-label'] || '').trim(),
  };
};

export default readIconTraitValues;
