const getLocalStorageArea = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const storageArea = window.localStorage;
    const probeKey = 'db-storage-probe';
    storageArea.setItem(probeKey, '1');
    storageArea.removeItem(probeKey);
    return storageArea;
  } catch {
    return null;
  }
};

export default getLocalStorageArea;
