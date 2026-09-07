const pickSeoImageFromAssets = (editor, rootElement, fieldKey) => {
  const assetManager = editor.AssetManager;
  const fieldElement = rootElement.querySelector('[data-db-seo-field="' + fieldKey + '"]');
  if (!assetManager || !assetManager.open || !fieldElement) return;
  rootElement.dataset.dbSeoPicking = 'true';
  rootElement.dataset.dbSeoFocusField = fieldKey;
  assetManager.open({
    types: ['image'],
    select: (selectedAsset) => {
      const assetSource = selectedAsset && selectedAsset.getSrc ? selectedAsset.getSrc() : '';
      if (assetSource) {
        fieldElement.value = assetSource;
        fieldElement.dataset.dbSeoTouched = 'true';
      }
      assetManager.close();
    },
  });
};

export default pickSeoImageFromAssets;
