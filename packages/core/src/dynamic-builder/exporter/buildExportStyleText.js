import getRegistryCssText from './getRegistryCssText.js';

const buildExportStyleText = (editor, page) => {
  const mainComponent = page && page.getMainComponent ? page.getMainComponent() : null;
  const generatedCss = mainComponent
    ? editor.getCss({ component: mainComponent })
    : editor.getCss({ keepUnusedStyles: true });
  return [getRegistryCssText(editor), String(generatedCss || '').trim()].filter(Boolean).join('\n\n');
};

export default buildExportStyleText;
