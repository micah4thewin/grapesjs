import buildSiteScriptText from './buildSiteScriptText.js';
import collectFeatureRuntimeScriptText from './collectFeatureRuntimeScriptText.js';
import collectPageScriptText from './collectPageScriptText.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import minifyScriptText from './minifyScriptText.js';
import resolveBindingTokensInMarkup from '../dataBinding/resolveBindingTokensInMarkup.js';
import resolveCustomScriptText from './resolveCustomScriptText.js';
import resolveExportSlotMarkup from './resolveExportSlotMarkup.js';
import spliceBodyEdgeMarkup from './spliceBodyEdgeMarkup.js';
import stripEditorOnlyAttributes from './stripEditorOnlyAttributes.js';

const buildDocumentBodyMarkup = (editor, page, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const mainComponent = page && page.getMainComponent ? page.getMainComponent() : null;
  const pageScriptText = collectPageScriptText(editor, page);
  let pageMarkup = stripEditorOnlyAttributes(mainComponent ? editor.getHtml({ component: mainComponent }) : '');
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
    const scriptChunks = [
      collectFeatureRuntimeScriptText(editor, page),
      pageScriptText,
      resolveCustomScriptText(editor, optionsRecord, page),
    ].filter(Boolean);
    if (scriptChunks.length) {
      const joinedScriptText = scriptChunks.join('\n\n');
      const compactScriptText =
        optionsRecord.optimizeJs === false ? joinedScriptText : minifyScriptText(joinedScriptText);
      const inlineScriptText = compactScriptText.replace(/<\/script/gi, '<\\/script');
      endParts.push('<script>\n' + inlineScriptText + '\n</script>');
    }
  }
  if (optionsRecord.extraBodyEndMarkup) endParts.push(String(optionsRecord.extraBodyEndMarkup));
  return spliceBodyEdgeMarkup(pageMarkup, startMarkup, endParts.filter(Boolean).join('\n'));
};

export default buildDocumentBodyMarkup;
