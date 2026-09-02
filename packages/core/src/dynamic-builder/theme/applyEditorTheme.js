import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import buildCanvasSelectionCss from './buildCanvasSelectionCss.js';
import composeEditorThemeCss from './composeEditorThemeCss.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';
import resolveThemeModeSetting from './resolveThemeModeSetting.js';
import applyContainerThemeMode from './applyContainerThemeMode.js';

const applyEditorTheme = (editor, pluginOptions) => {
  const themeOptions = (pluginOptions && pluginOptions.theme) || {};
  const modeSetting = resolveThemeModeSetting(themeOptions);
  const applyThemeToEditorDom = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement) return;
    applyContainerThemeMode(editor, modeSetting);
    injectEditorStylesOnce(editor, 'db-css-theme-editor', composeEditorThemeCss());
  };
  applyThemeToEditorDom();
  registerEditorOnlyCanvasStyles(editor, 'db-css-theme-canvas-selection', buildCanvasSelectionCss());
  if (editor.onReady) editor.onReady(() => applyThemeToEditorDom());
};

export default applyEditorTheme;
