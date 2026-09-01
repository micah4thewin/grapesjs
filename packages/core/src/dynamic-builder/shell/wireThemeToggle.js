import getIconMarkup from '../support/getIconMarkup.js';
import resolveEffectiveThemeMode from './resolveEffectiveThemeMode.js';
import toggleEditorThemeMode from './toggleEditorThemeMode.js';

const wireThemeToggle = (editor, stripElement) => {
  const toggleButton = stripElement.querySelector('[data-db-theme-toggle]');
  if (!toggleButton) return;
  const syncToggleAppearance = () => {
    const effectiveMode = resolveEffectiveThemeMode(editor);
    const targetLabel = effectiveMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    toggleButton.innerHTML = getIconMarkup(effectiveMode === 'dark' ? 'sun' : 'moon', { size: 16 });
    toggleButton.setAttribute('aria-label', targetLabel);
    toggleButton.title = targetLabel;
  };
  toggleButton.addEventListener('click', () => {
    toggleEditorThemeMode(editor);
    syncToggleAppearance();
  });
  editor.on('db:theme:update', syncToggleAppearance);
  syncToggleAppearance();
};

export default wireThemeToggle;
