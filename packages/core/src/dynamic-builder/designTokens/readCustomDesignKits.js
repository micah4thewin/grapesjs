import parseCustomKitList from './parseCustomKitList.js';

const readCustomDesignKits = () => {
  try {
    return parseCustomKitList(window.localStorage.getItem('db-custom-design-kits') || '[]');
  } catch (storageError) {
    return [];
  }
};

export default readCustomDesignKits;
