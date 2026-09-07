import toSlugText from '../support/toSlugText.js';

const buildCustomFontIdentifier = (familyName, weightValue, styleName) =>
  ['font', toSlugText(familyName) || 'family', weightValue, styleName].join('-');

export default buildCustomFontIdentifier;
