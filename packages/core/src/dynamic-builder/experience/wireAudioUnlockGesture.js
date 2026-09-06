import ensureAudioContext from './ensureAudioContext.js';
import getSoundPreference from './getSoundPreference.js';

const gestureEventNames = ['pointerup', 'touchend', 'click', 'keydown'];

const wireAudioUnlockGesture = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return;
  const removeUnlockListeners = () =>
    gestureEventNames.forEach((eventName) => ownerDocument.removeEventListener(eventName, unlockAudioOnce, true));
  function unlockAudioOnce() {
    if (!getSoundPreference()) return;
    const audioContext = ensureAudioContext(editor, { allowCreate: true });
    if (!audioContext) return;
    removeUnlockListeners();
  }
  gestureEventNames.forEach((eventName) => ownerDocument.addEventListener(eventName, unlockAudioOnce, true));
  editor.on('destroy', removeUnlockListeners);
};

export default wireAudioUnlockGesture;
