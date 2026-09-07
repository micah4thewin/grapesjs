const storageKey = 'db-block-categories-open';

const resolveStorageArea = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const windowObject = containerElement && containerElement.ownerDocument && containerElement.ownerDocument.defaultView;
  try {
    return (windowObject && windowObject.localStorage) || null;
  } catch (accessError) {
    return null;
  }
};

const readStoredOpenState = (storageArea) => {
  try {
    return JSON.parse(storageArea.getItem(storageKey) || '{}') || {};
  } catch (readError) {
    return {};
  }
};

const writeStoredOpenState = (storageArea, storedState) => {
  try {
    storageArea.setItem(storageKey, JSON.stringify(storedState));
    return true;
  } catch (writeError) {
    return false;
  }
};

const rememberBlockCategoryState = (editor) => {
  const storageArea = resolveStorageArea(editor);
  if (!storageArea) return;
  const storedState = readStoredOpenState(storageArea);
  const categoryCollection = editor.BlockManager.getCategories();
  const resolveCategoryId = (categoryModel) => String(categoryModel.getId ? categoryModel.getId() : categoryModel.id);
  const applyStoredState = (categoryModel) => {
    const storedValue = storedState[resolveCategoryId(categoryModel)];
    if (typeof storedValue === 'boolean' && categoryModel.get('open') !== storedValue)
      categoryModel.set('open', storedValue);
  };
  categoryCollection.forEach(applyStoredState);
  categoryCollection.on('add', applyStoredState);
  categoryCollection.on('change:open', (categoryModel) => {
    storedState[resolveCategoryId(categoryModel)] = Boolean(categoryModel.get('open'));
    writeStoredOpenState(storageArea, storedState);
  });
};

export default rememberBlockCategoryState;
