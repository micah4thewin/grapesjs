import pickUniqueNameWithSuffix from '../support/pickUniqueNameWithSuffix.js';
import toSlugText from '../support/toSlugText.js';

const buildCustomIconIdentifier = (labelText, usedNames) =>
  pickUniqueNameWithSuffix('custom:' + (toSlugText(labelText) || 'icon'), usedNames);

export default buildCustomIconIdentifier;
