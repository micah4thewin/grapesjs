const setSoundPreference = (isEnabled) => {
  try {
    window.localStorage && window.localStorage.setItem('db-editor-sound', isEnabled ? 'on' : 'off');
  } catch (storageError) {
    return;
  }
};

export default setSoundPreference;
