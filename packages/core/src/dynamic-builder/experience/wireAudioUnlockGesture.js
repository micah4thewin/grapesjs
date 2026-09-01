import ensureAudioContext from './ensureAudioContext.js';
import getSoundPreference from './getSoundPreference.js';

const wireAudioUnlockGesture = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const unlockAudioOnce = () => {
    getSoundPreference() && ensureAudioContext(editor);
    containerElement.ownerDocument.removeEventListener('pointerdown', unlockAudioOnce, true);
    containerElement.ownerDocument.removeEventListener('keydown', unlockAudioOnce, true);
  };
  containerElement.ownerDocument.addEventListener('pointerdown', unlockAudioOnce, true);
  containerElement.ownerDocument.addEventListener('keydown', unlockAudioOnce, true);
};

export default wireAudioUnlockGesture;
