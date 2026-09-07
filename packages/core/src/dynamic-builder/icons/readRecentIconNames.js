const readRecentIconNames = () => {
  try {
    const storedValue = window.localStorage.getItem('db-icon-picker-recent');
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue.filter((iconName) => typeof iconName === 'string') : [];
  } catch (storageError) {
    return [];
  }
};

export default readRecentIconNames;
