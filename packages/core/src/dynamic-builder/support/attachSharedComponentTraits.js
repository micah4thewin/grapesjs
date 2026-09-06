import getSharedComponentTraits from './getSharedComponentTraits.js';
import getSharedTraitExemptTypes from './getSharedTraitExemptTypes.js';

const hasTraitNamed = (traitCollection, traitName) =>
  Boolean(traitCollection.filter((traitModel) => traitModel.get('name') === traitName).length);

const attachSharedComponentTraits = (editor) => {
  const exemptTypes = getSharedTraitExemptTypes();
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
    if (exemptTypes.indexOf(String(selectedComponent.get('type') || '')) >= 0) return;
    if (typeof selectedComponent.addTrait !== 'function') return;
    const traitCollection = selectedComponent.get('traits');
    if (!traitCollection) return;
    const missingTraits = getSharedComponentTraits().filter(
      (traitDefinition) => !hasTraitNamed(traitCollection, traitDefinition.name),
    );
    if (!missingTraits.length) return;
    selectedComponent.addTrait(missingTraits);
  });
};

export default attachSharedComponentTraits;
