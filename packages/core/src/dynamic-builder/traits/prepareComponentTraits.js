import buildComponentTraitCategory from './buildComponentTraitCategory.js';
import normalizeComponentLinkTraits from './normalizeComponentLinkTraits.js';

const prepareComponentTraits = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
    const traitCollection = selectedComponent.get('traits');
    if (!traitCollection || !traitCollection.models) return;
    normalizeComponentLinkTraits(selectedComponent);
    const uncategorisedTraits = traitCollection.models.filter((traitModel) => !traitModel.get('category'));
    if (!uncategorisedTraits.length) return;
    const componentCategory = buildComponentTraitCategory(selectedComponent);
    uncategorisedTraits.forEach((traitModel) => traitModel.set('category', componentCategory, { silent: true }));
  });
};

export default prepareComponentTraits;
