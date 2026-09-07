import buildAlertButtonTraitDefinitions from './buildAlertButtonTraitDefinitions.js';
import listPageFormOptions from './listPageFormOptions.js';

const refreshAlertButtonTraits = (editor, component) => {
  if (!component || typeof component.get !== 'function' || component.get('type') !== 'db-alert-button') return;
  const attributesRecord = component.getAttributes();
  const traitDefinitions = buildAlertButtonTraitDefinitions(attributesRecord, listPageFormOptions(editor, component));
  const currentNames = (component.get('traits') || []).map((traitModel) => traitModel.get('name')).join(',');
  const nextNames = traitDefinitions.map((traitDefinition) => traitDefinition.name).join(',');
  if (currentNames === nextNames && attributesRecord['data-db-alert-then'] !== 'submit-form') return;
  component.set('traits', traitDefinitions, { avoidStore: true });
};

export default refreshAlertButtonTraits;
