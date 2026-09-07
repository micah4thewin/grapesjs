import collectFeatureRuntimeScriptText from './collectFeatureRuntimeScriptText.js';
import collectSiteRuntimeScriptText from './collectSiteRuntimeScriptText.js';
import listPageExportEntries from './listPageExportEntries.js';
import minifyScriptText from './minifyScriptText.js';
import resolveCustomScriptText from './resolveCustomScriptText.js';

const buildSiteScriptText = (editor, buildOptions) => {
  const scriptChunks = [];
  const runtimeScriptText = collectSiteRuntimeScriptText(editor);
  if (runtimeScriptText) scriptChunks.push(runtimeScriptText);
  const featureScriptText = collectFeatureRuntimeScriptText(editor);
  if (featureScriptText) scriptChunks.push(featureScriptText);
  listPageExportEntries(editor).forEach((pageEntry) => {
    const customScriptText = resolveCustomScriptText(editor, buildOptions, pageEntry.page);
    if (!customScriptText) return;
    const pageKey = JSON.stringify(pageEntry.fileName.replace(/\.html$/i, ''));
    scriptChunks.push(
      "if (document.documentElement.getAttribute('data-db-page') === " + pageKey + ') {\n' + customScriptText + '\n}',
    );
  });
  const combinedScript = scriptChunks.join('\n\n');
  return (buildOptions || {}).optimizeJs === false ? combinedScript : minifyScriptText(combinedScript);
};

export default buildSiteScriptText;
