const relabelledLinkLabels = ['Link URL', 'Custom URL'];

const normalizeComponentLinkTraits = (selectedComponent) => {
  const traitCollection = selectedComponent && selectedComponent.get ? selectedComponent.get('traits') : null;
  if (!traitCollection || !traitCollection.models) return;
  const hrefTrait = traitCollection.models.find(
    (traitModel) => traitModel.get('name') === 'href' && traitModel.get('type') === 'db-url',
  );
  const pageLinkTraits = traitCollection.models.filter((traitModel) => traitModel.get('type') === 'db-page-link');
  if (hrefTrait && pageLinkTraits.length) traitCollection.remove(pageLinkTraits);
  if (hrefTrait && relabelledLinkLabels.indexOf(String(hrefTrait.get('label') || '')) >= 0) {
    hrefTrait.set('label', 'Link', { silent: true });
  }
};

export default normalizeComponentLinkTraits;
