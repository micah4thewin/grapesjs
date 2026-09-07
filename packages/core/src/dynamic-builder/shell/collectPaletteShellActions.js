import resolveEffectiveThemeMode from './resolveEffectiveThemeMode.js';
import toggleEditorThemeMode from './toggleEditorThemeMode.js';

const collectPaletteShellActions = (editor, pluginOptions) => {
  const actionRecords = [];
  const nextThemeMode = resolveEffectiveThemeMode(editor) === 'dark' ? 'light' : 'dark';
  actionRecords.push({
    actionId: 'shell:toggle-theme',
    groupTitle: 'Appearance',
    label: `Switch to ${nextThemeMode} theme`,
    iconName: nextThemeMode === 'dark' ? 'moon' : 'sun',
    keywords: 'theme dark light mode appearance colours colors',
    keysText: '',
    hintText: '',
    runAction: () => toggleEditorThemeMode(editor, pluginOptions),
  });
  const containerElement = editor.getContainer && editor.getContainer();
  const soundToggle = containerElement && containerElement.querySelector('[data-db-sound-toggle]');
  if (soundToggle) {
    const soundsAreOn = soundToggle.getAttribute('aria-pressed') === 'true';
    actionRecords.push({
      actionId: 'shell:toggle-sound',
      groupTitle: 'Appearance',
      label: soundsAreOn ? 'Turn interface sounds off' : 'Turn interface sounds on',
      iconName: soundsAreOn ? 'volumeOff' : 'volume',
      keywords: 'sound audio mute feedback tones',
      keysText: '',
      hintText: '',
      runAction: () => soundToggle.click(),
    });
  }
  return actionRecords;
};

export default collectPaletteShellActions;
