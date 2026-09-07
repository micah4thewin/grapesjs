import getDataSourceRegistry from './getDataSourceRegistry.js';
import resolveRepeaterChainRegistry from './resolveRepeaterChainRegistry.js';
import resolveRepeaterSettings from './resolveRepeaterSettings.js';

const resolveComponentBindingContext = (editor, component) => {
  const settingsList = [];
  let currentComponent = component;
  while (currentComponent && typeof currentComponent.get === 'function') {
    const parentComponent = currentComponent.parent ? currentComponent.parent() : null;
    const isTemplate = Boolean(
      currentComponent.getAttributes && currentComponent.getAttributes()['data-db-repeater-item'],
    );
    if (isTemplate && parentComponent && parentComponent.get('type') === 'db-repeater') {
      settingsList.unshift(resolveRepeaterSettings(parentComponent.getAttributes()));
    }
    currentComponent = parentComponent;
  }
  return resolveRepeaterChainRegistry(getDataSourceRegistry(editor), settingsList);
};

export default resolveComponentBindingContext;
