import describeAssetFileName from './describeAssetFileName.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const renderAssetTraitPreview = (wrapperElement, assetSource) => {
  const thumbnailElement = resolveTraitInnerElement(wrapperElement, '.gjs-db-trait-asset-thumb');
  const nameElement = resolveTraitInnerElement(wrapperElement, '[data-db-asset-name]');
  const removeButton = resolveTraitInnerElement(wrapperElement, '[data-db-asset-remove]');
  const hasSource = Boolean(assetSource);
  if (thumbnailElement) {
    if (hasSource) {
      if (thumbnailElement.getAttribute('src') !== assetSource) thumbnailElement.setAttribute('src', assetSource);
    } else thumbnailElement.removeAttribute('src');
    thumbnailElement.hidden = !hasSource;
  }
  if (nameElement) {
    nameElement.textContent = hasSource ? describeAssetFileName(assetSource) : 'No image chosen';
    nameElement.title = hasSource ? String(assetSource) : '';
  }
  if (removeButton) removeButton.hidden = !hasSource;
};

export default renderAssetTraitPreview;
