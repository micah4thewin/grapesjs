import getIconMarkup from '../support/getIconMarkup.js';
import resolveEffectiveThemeMode from './resolveEffectiveThemeMode.js';
import toggleEditorThemeMode from './toggleEditorThemeMode.js';

const wireThemeToggle = (editor, stripElement, pluginOptions) => {
  const toggleButton = stripElement.querySelector('[data-db-theme-toggle]');
  if (!toggleButton) return;
  const syncToggleAppearance = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    const effectiveMode = resolveEffectiveThemeMode(editor);
    const followsSystem = !(containerElement && containerElement.getAttribute('data-theme'));
    const stateText = followsSystem ? ` Follows your system (${effectiveMode}).` : '';
    const targetLabel = `${effectiveMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}.${stateText}`;
    toggleButton.innerHTML = getIconMarkup(effectiveMode === 'dark' ? 'sun' : 'moon', { size: 16 });
    toggleButton.setAttribute('aria-label', targetLabel);
    toggleButton.title = targetLabel;
  };
  toggleButton.addEventListener('click', () => {
    toggleEditorThemeMode(editor, pluginOptions);
    syncToggleAppearance();
  });
  editor.on('db:theme:update', syncToggleAppearance);
  const viewWindow = stripElement.ownerDocument.defaultView;
  const schemeQuery =
    viewWindow && viewWindow.matchMedia ? viewWindow.matchMedia('(prefers-color-scheme: dark)') : null;
  if (schemeQuery && schemeQuery.addEventListener) {
    const handleSchemeChange = () => {
      syncToggleAppearance();
      editor.trigger('db:theme:update', resolveEffectiveThemeMode(editor));
    };
    schemeQuery.addEventListener('change', handleSchemeChange);
    editor.on('destroy', () => schemeQuery.removeEventListener('change', handleSchemeChange));
  }
  syncToggleAppearance();
};

export default wireThemeToggle;
