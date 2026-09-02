import collectSiteRuntimeScriptText from './collectSiteRuntimeScriptText.js';
import listPageExportEntries from './listPageExportEntries.js';
import resolveCustomScriptText from './resolveCustomScriptText.js';

const buildSiteScriptText = (editor, buildOptions) => {
  const scriptChunks = [];
  const runtimeScriptText = collectSiteRuntimeScriptText(editor);
  if (runtimeScriptText) scriptChunks.push(runtimeScriptText);
  listPageExportEntries(editor).forEach((pageEntry) => {
    const customScriptText = resolveCustomScriptText(editor, buildOptions, pageEntry.page);
    if (!customScriptText) return;
    const pageKey = JSON.stringify(pageEntry.fileName.replace(/\.html$/i, ''));
    scriptChunks.push(
      "if (document.documentElement.getAttribute('data-db-page') === " + pageKey + ') {\n' + customScriptText + '\n}',
    );
  });
  return scriptChunks.join('\n\n');
};

export default buildSiteScriptText;
