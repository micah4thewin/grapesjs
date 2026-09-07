import escapeHtmlText from '../support/escapeHtmlText.js';
import findDescendantByField from './findDescendantByField.js';
import writePortraitAlt from './writePortraitAlt.js';

const applyMarketingFieldPreset = (rootComponent, presetRecord) => {
  Object.keys(presetRecord).forEach((fieldName) => {
    const fieldComponent = findDescendantByField(rootComponent, fieldName);
    if (fieldComponent) fieldComponent.components(escapeHtmlText(presetRecord[fieldName]));
  });
  writePortraitAlt(rootComponent, presetRecord.name);
};

export default applyMarketingFieldPreset;
