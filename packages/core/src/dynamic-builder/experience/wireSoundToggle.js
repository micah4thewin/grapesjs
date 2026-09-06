import ensureAudioContext from './ensureAudioContext.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getSoundPreference from './getSoundPreference.js';
import playFeedbackTone from './playFeedbackTone.js';
import setSoundPreference from './setSoundPreference.js';

const wireSoundToggle = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement) return;
  const toggleButton = containerElement.querySelector('[data-db-sound-toggle]');
  if (!toggleButton) return;
  const syncToggleAppearance = () => {
    const soundEnabled = getSoundPreference();
    const targetLabel = soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds';
    toggleButton.innerHTML = getIconMarkup(soundEnabled ? 'volume' : 'volumeOff', { size: 16 });
    toggleButton.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
    toggleButton.setAttribute('aria-label', targetLabel);
    toggleButton.title = targetLabel;
  };
  toggleButton.addEventListener('click', () => {
    const nextEnabled = !getSoundPreference();
    setSoundPreference(nextEnabled);
    syncToggleAppearance();
    if (nextEnabled) {
      ensureAudioContext(editor, { allowCreate: true });
      setTimeout(() => playFeedbackTone(editor, 'toggle'), 30);
    }
    editor.trigger('db:sound:update', nextEnabled);
  });
  syncToggleAppearance();
};

export default wireSoundToggle;
