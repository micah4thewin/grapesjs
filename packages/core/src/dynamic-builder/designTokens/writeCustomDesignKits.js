const writeCustomDesignKits = (kitRecords) => {
  try {
    window.localStorage.setItem('db-custom-design-kits', JSON.stringify(Array.isArray(kitRecords) ? kitRecords : []));
    return true;
  } catch (storageError) {
    return false;
  }
};

export default writeCustomDesignKits;
