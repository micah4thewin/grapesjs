import getRuntimeScriptRegistry from '../support/getRuntimeScriptRegistry.js';

const collectFeatureRuntimeScriptText = (editor, page) => {
  const scriptChunks = [];
  getRuntimeScriptRegistry(editor).forEach((runtimeRecord) => {
    if (!runtimeRecord || typeof runtimeRecord.source !== 'function') return;
    if (typeof runtimeRecord.detect === 'function' && !runtimeRecord.detect(editor, page)) return;
    const scriptText = String(runtimeRecord.source() || '').trim();
    if (scriptText) scriptChunks.push('(function () {\n' + scriptText + '\n})();');
  });
  return scriptChunks.join('\n\n');
};

export default collectFeatureRuntimeScriptText;
