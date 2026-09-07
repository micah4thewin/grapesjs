import getSharedTraitExemptTypes from '../support/getSharedTraitExemptTypes.js';

const attachDeviceVisibilityTrait = (editor) => {
  const exemptTypes = getSharedTraitExemptTypes();
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
    if (exemptTypes.indexOf(String(selectedComponent.get('type') || '')) >= 0) return;
    if (typeof selectedComponent.addTrait !== 'function') return;
    const traitCollection = selectedComponent.get('traits');
    if (!traitCollection) return;
    const alreadyAttached = traitCollection.filter(
      (traitModel) => traitModel.get('name') === 'db-device-visibility',
    ).length;
    if (alreadyAttached) return;
    selectedComponent.addTrait({
      type: 'db-device-visibility',
      name: 'db-device-visibility',
      label: 'Show on devices',
      changeProp: true,
      category: { id: 'db-visibility', label: 'Visibility', open: false },
    });
  });
};

export default attachDeviceVisibilityTrait;
