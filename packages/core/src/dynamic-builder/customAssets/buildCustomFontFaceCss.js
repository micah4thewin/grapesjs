import buildFontFaceRuleText from './buildFontFaceRuleText.js';
import normalizeCustomFontRecord from './normalizeCustomFontRecord.js';

const buildCustomFontFaceCss = (fontRecords) =>
  (Array.isArray(fontRecords) ? fontRecords : [])
    .map((fontRecord) => normalizeCustomFontRecord(fontRecord))
    .filter(Boolean)
    .map((fontRecord) => buildFontFaceRuleText(fontRecord))
    .join('\n');

export default buildCustomFontFaceCss;
