import createLinkTraitDefinition from './createLinkTraitDefinition.js';
import createPlainUrlTraitDefinition from './createPlainUrlTraitDefinition.js';

const usesLinkControl = (trait) => String((trait && trait.get('name')) || '') === 'href';

const createUrlTraitDefinition = (editor) => {
  const linkDefinition = createLinkTraitDefinition(editor);
  const plainDefinition = createPlainUrlTraitDefinition();
  const pickDefinition = (callbackOptions) =>
    usesLinkControl(callbackOptions && callbackOptions.trait) ? linkDefinition : plainDefinition;
  return {
    eventCapture: ['change', 'click'],
    createInput: (callbackOptions) => pickDefinition(callbackOptions).createInput(callbackOptions),
    onEvent: (callbackOptions) => pickDefinition(callbackOptions).onEvent(callbackOptions),
    onUpdate: (callbackOptions) => pickDefinition(callbackOptions).onUpdate(callbackOptions),
  };
};

export default createUrlTraitDefinition;
