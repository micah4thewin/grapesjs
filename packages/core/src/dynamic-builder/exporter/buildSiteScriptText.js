import collectPageScriptText from './collectPageScriptText.js';
import resolveCustomScriptText from './resolveCustomScriptText.js';

const buildSiteScriptText = (editor, buildOptions) => {
  const scriptChunks = [];
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage) => {
    const pageScriptText = collectPageScriptText(editor, sitePage);
    if (pageScriptText && !scriptChunks.includes(pageScriptText)) scriptChunks.push(pageScriptText);
  });
  const customScriptText = resolveCustomScriptText(editor, buildOptions);
  if (customScriptText) scriptChunks.push(customScriptText);
  return scriptChunks.join('\n\n');
};

export default buildSiteScriptText;
