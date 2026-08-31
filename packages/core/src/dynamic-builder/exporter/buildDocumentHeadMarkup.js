import buildExportStyleText from './buildExportStyleText.js';
import buildJsonLdScriptMarkup from './buildJsonLdScriptMarkup.js';
import buildSeoHeadMarkup from '../seo/buildSeoHeadMarkup.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';

const buildDocumentHeadMarkup = (editor, page, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const headParts = ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">'];
  headParts.push(buildSeoHeadMarkup(editor, page));
  if (optionsRecord.separateAssets) {
    headParts.push('<link rel="stylesheet" href="styles.css">');
  } else {
    const styleText = buildExportStyleText(editor, page).replace(/<\/style/gi, '<\\/style');
    if (styleText) headParts.push('<style>\n' + styleText + '\n</style>');
  }
  headParts.push(buildJsonLdScriptMarkup(editor, page));
  const customHeadHtml = getSiteCustomCodeRecord(editor).headHtml;
  if (customHeadHtml) headParts.push(sanitizeHtmlMarkup(customHeadHtml).trim());
  return headParts.filter(Boolean).join('\n');
};

export default buildDocumentHeadMarkup;
