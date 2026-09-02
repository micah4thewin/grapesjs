import buildSiteScriptText from './buildSiteScriptText.js';
import collectPageScriptText from './collectPageScriptText.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import resolveBindingTokensInMarkup from '../dataBinding/resolveBindingTokensInMarkup.js';
import resolveCustomScriptText from './resolveCustomScriptText.js';
import resolveExportSlotMarkup from './resolveExportSlotMarkup.js';
import spliceBodyEdgeMarkup from './spliceBodyEdgeMarkup.js';

const buildDocumentBodyMarkup = (editor, page, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const mainComponent = page && page.getMainComponent ? page.getMainComponent() : null;
  const pageScriptText = collectPageScriptText(editor, page);
  let pageMarkup = mainComponent ? String(editor.getHtml({ component: mainComponent }) || '') : '';
  const appendedScriptMarkup = pageScriptText ? '<script>' + pageScriptText + '</script>' : '';
  if (appendedScriptMarkup && pageMarkup.endsWith(appendedScriptMarkup)) {
    pageMarkup = pageMarkup.slice(0, -appendedScriptMarkup.length);
  }
  if (optionsRecord.resolveBindings !== false) pageMarkup = resolveBindingTokensInMarkup(editor, pageMarkup);
  const customCodeRecord = getSiteCustomCodeRecord(editor);
  const startMarkup = resolveExportSlotMarkup(customCodeRecord, customCodeRecord.bodyStartHtml);
  const endParts = [];
  const endSlotMarkup = resolveExportSlotMarkup(customCodeRecord, customCodeRecord.bodyEndHtml);
  if (endSlotMarkup) endParts.push(endSlotMarkup);
  if (optionsRecord.separateAssets) {
    const siteScriptText =
      optionsRecord.siteScriptText !== undefined
        ? optionsRecord.siteScriptText
        : buildSiteScriptText(editor, optionsRecord);
    if (siteScriptText) endParts.push('<script src="site.js" defer></script>');
  } else {
    const scriptChunks = [pageScriptText, resolveCustomScriptText(editor, optionsRecord, page)].filter(Boolean);
    if (scriptChunks.length) {
      const inlineScriptText = scriptChunks.join('\n\n').replace(/<\/script/gi, '<\\/script');
      endParts.push('<script>\n' + inlineScriptText + '\n</script>');
    }
  }
  return spliceBodyEdgeMarkup(pageMarkup, startMarkup, endParts.filter(Boolean).join('\n'));
};

export default buildDocumentBodyMarkup;
