const getSoundPreference = () => {
  try {
    return window.localStorage && window.localStorage.getItem('db-editor-sound') === 'on';
  } catch (storageError) {
    return false;
  }
};

export default getSoundPreference;
