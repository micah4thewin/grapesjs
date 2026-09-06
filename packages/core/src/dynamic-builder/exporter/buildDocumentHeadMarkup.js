import buildExportStyleText from './buildExportStyleText.js';
import buildJsonLdScriptMarkup from './buildJsonLdScriptMarkup.js';
import buildSeoHeadMarkup from '../seo/buildSeoHeadMarkup.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import resolveExportSlotMarkup from './resolveExportSlotMarkup.js';

const buildDocumentHeadMarkup = (editor, page, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const headParts = ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">'];
  headParts.push(buildSeoHeadMarkup(editor, page));
  if (optionsRecord.separateAssets) {
    headParts.push('<link rel="stylesheet" href="styles.css">');
  } else {
    const styleText = buildExportStyleText(editor, page, optionsRecord).replace(/<\/style/gi, '<\\/style');
    if (styleText) headParts.push('<style>\n' + styleText + '\n</style>');
  }
  headParts.push(buildJsonLdScriptMarkup(editor, page));
  const customCodeRecord = getSiteCustomCodeRecord(editor);
  const headSlotMarkup = resolveExportSlotMarkup(customCodeRecord, customCodeRecord.headHtml);
  if (headSlotMarkup) headParts.push(headSlotMarkup);
  return headParts.filter(Boolean).join('\n');
};

export default buildDocumentHeadMarkup;
