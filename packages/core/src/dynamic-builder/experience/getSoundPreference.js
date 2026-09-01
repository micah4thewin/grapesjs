const getSoundPreference = () => {
  try {
    return !(window.localStorage && window.localStorage.getItem('db-editor-sound') === 'off');
  } catch (storageError) {
    return true;
  }
};

export default getSoundPreference;
