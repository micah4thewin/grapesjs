import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const createAssetTraitDefinition = (editor) => ({
  eventCapture: ['click', 'change'],
  createInput: () =>
    [
      '<div class="gjs-db-field gjs-db-trait-asset">',
      '<button type="button" class="gjs-db-button gjs-db-trait-asset-choose" data-db-asset-choose>Choose</button>',
      '<img class="gjs-db-trait-asset-thumb" alt="Selected asset preview" hidden>',
      '</div>',
    ].join(''),
  onEvent: ({ trait, event }) => {
    const eventTarget = event && event.target;
    if (!eventTarget || !eventTarget.closest || !eventTarget.closest('[data-db-asset-choose]')) return;
    const assetManager = editor.AssetManager;
    if (!assetManager || !assetManager.open) return;
    assetManager.open({
      types: ['image'],
      select: (selectedAsset) => {
        const assetSource = selectedAsset && selectedAsset.getSrc ? selectedAsset.getSrc() : '';
        if (assetSource) trait.set('value', assetSource);
        assetManager.close();
      },
    });
  },
  onUpdate: ({ trait, elInput }) => {
    const thumbnailElement = resolveTraitInnerElement(elInput, '.gjs-db-trait-asset-thumb');
    if (!thumbnailElement) return;
    const assetSource = formatTraitDisplayValue(trait.getValue());
    if (assetSource) {
      if (thumbnailElement.getAttribute('src') !== assetSource) thumbnailElement.setAttribute('src', assetSource);
      thumbnailElement.hidden = false;
    } else {
      thumbnailElement.removeAttribute('src');
      thumbnailElement.hidden = true;
    }
  },
});

export default createAssetTraitDefinition;
