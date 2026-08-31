import getCanvasCssRegistry from '../support/getCanvasCssRegistry.js';

const getRegistryCssText = (editor) => {
  const registryChunks = [];
  getCanvasCssRegistry(editor).forEach((registeredCss) => {
    const cssText = String(registeredCss || '').trim();
    if (cssText) registryChunks.push(cssText);
  });
  return registryChunks.join('\n\n');
};

export default getRegistryCssText;
