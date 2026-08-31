import collectPageScriptText from './collectPageScriptText.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import resolveBindingTokensInMarkup from '../dataBinding/resolveBindingTokensInMarkup.js';
import resolveCustomScriptText from './resolveCustomScriptText.js';
import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';
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
  const startMarkup = customCodeRecord.bodyStartHtml ? sanitizeHtmlMarkup(customCodeRecord.bodyStartHtml).trim() : '';
  const endParts = [];
  if (customCodeRecord.bodyEndHtml) endParts.push(sanitizeHtmlMarkup(customCodeRecord.bodyEndHtml).trim());
  if (optionsRecord.separateAssets) {
    endParts.push('<script src="site.js" defer></script>');
  } else {
    const scriptChunks = [pageScriptText, resolveCustomScriptText(editor, optionsRecord)].filter(Boolean);
    if (scriptChunks.length) {
      const inlineScriptText = scriptChunks.join('\n\n').replace(/<\/script/gi, '<\\/script');
      endParts.push('<script>\n' + inlineScriptText + '\n</script>');
    }
  }
  return spliceBodyEdgeMarkup(pageMarkup, startMarkup, endParts.filter(Boolean).join('\n'));
};

export default buildDocumentBodyMarkup;
