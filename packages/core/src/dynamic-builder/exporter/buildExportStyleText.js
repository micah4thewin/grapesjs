import collectCssMatchDocuments from './collectCssMatchDocuments.js';
import filterRegistryCssChunks from './filterRegistryCssChunks.js';
import getRegistryCssText from './getRegistryCssText.js';
import minifyCssText from './minifyCssText.js';

const buildExportStyleText = (editor, page, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const mainComponent = page && page.getMainComponent ? page.getMainComponent() : null;
  const generatedCss = mainComponent
    ? editor.getCss({ component: mainComponent })
    : editor.getCss({ keepUnusedStyles: true });
  const optimizeEnabled = optionsRecord.optimizeCss !== false;
  const registryCss = optimizeEnabled
    ? filterRegistryCssChunks(editor, collectCssMatchDocuments(editor, page))
    : getRegistryCssText(editor);
  const combinedCss = [registryCss, String(generatedCss || '').trim()].filter(Boolean).join('\n\n');
  return optimizeEnabled ? minifyCssText(combinedCss) : combinedCss;
};

export default buildExportStyleText;
