import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import composeEditorThemeCss from './composeEditorThemeCss.js';
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
  if (editor.onReady) editor.onReady(() => applyThemeToEditorDom());
};

export default applyEditorTheme;
