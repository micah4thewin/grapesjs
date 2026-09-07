import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import getIconMarkup from '../support/getIconMarkup.js';
import refreshTraitView from './refreshTraitView.js';
import renderAssetTraitPreview from './renderAssetTraitPreview.js';
import writeComponentAttributeValue from './writeComponentAttributeValue.js';

const openAssetPicker = (editor, trait) => {
  const assetManager = editor.AssetManager;
  if (!assetManager || !assetManager.open) return;
  assetManager.open({
    types: ['image'],
    select: (selectedAsset) => {
      const assetSource = selectedAsset && selectedAsset.getSrc ? selectedAsset.getSrc() : '';
      if (assetSource) {
        trait.set('value', assetSource);
        refreshTraitView(trait);
      }
      assetManager.close();
    },
  });
};

const createAssetTraitDefinition = (editor) => ({
  eventCapture: ['click'],
  createInput: ({ trait }) =>
    [
      '<div class="gjs-db-field gjs-db-trait-asset">',
      '<img class="gjs-db-trait-asset-thumb" alt="" hidden>',
      '<div class="gjs-db-trait-asset-body">',
      `<span class="gjs-db-trait-asset-name gjs-db-muted" data-db-asset-name>No image chosen</span>`,
      '<div class="gjs-db-trait-asset-actions">',
      `<button type="button" class="gjs-db-button gjs-db-trait-asset-choose" data-db-asset-choose${buildTraitAriaLabelAttribute(trait, '- choose image')}>`,
      getIconMarkup('image', { size: 14 }),
      '<span>Choose image</span></button>',
      `<button type="button" class="gjs-db-button gjs-db-trait-asset-remove" data-db-asset-remove hidden${buildTraitAriaLabelAttribute(trait, '- remove image')}>Remove</button>`,
      '</div></div></div>',
    ].join(''),
  onEvent: ({ trait, component, event }) => {
    const eventTarget = event && event.target && event.target.closest ? event.target : null;
    if (!eventTarget) return;
    if (eventTarget.closest('[data-db-asset-choose]')) {
      openAssetPicker(editor, trait);
      return;
    }
    if (!eventTarget.closest('[data-db-asset-remove]')) return;
    writeComponentAttributeValue(component, trait.get('name'), '');
    trait.set('value', '');
    refreshTraitView(trait);
  },
  onUpdate: ({ trait, elInput }) => {
    renderAssetTraitPreview(elInput, formatTraitDisplayValue(trait.getValue()));
  },
});

export default createAssetTraitDefinition;
