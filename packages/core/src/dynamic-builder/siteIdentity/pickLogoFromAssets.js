import escapeHtmlText from '../support/escapeHtmlText.js';

const pickLogoFromAssets = (editor, formElement, afterPick) => {
  const assetManager = editor.AssetManager;
  if (!assetManager || !assetManager.open) return;
  assetManager.open({
    types: ['image'],
    select: (selectedAsset) => {
      const assetSource = selectedAsset && selectedAsset.getSrc ? selectedAsset.getSrc() : '';
      assetManager.close();
      if (!assetSource) return;
      const sourceInput = formElement.querySelector('[data-db-identity-logo-src]');
      const logoHost = formElement.querySelector('[data-db-identity-logo]');
      if (sourceInput) sourceInput.value = assetSource;
      if (logoHost) logoHost.innerHTML = `<img src="${escapeHtmlText(assetSource)}" alt="Logo preview">`;
      afterPick(assetSource);
    },
  });
};

export default pickLogoFromAssets;
