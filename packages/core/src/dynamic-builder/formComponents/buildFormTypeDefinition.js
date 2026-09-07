import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildFormDefaultChildren from './buildFormDefaultChildren.js';
import buildFormTraitDefinitions from './buildFormTraitDefinitions.js';
import runFormBehavior from './runFormBehavior.js';

const buildFormTypeDefinition = (formTextDefaults) => ({
  type: 'db-form',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'form') && { type: 'db-form' },
  model: {
    defaults: {
      tagName: 'form',
      name: 'Form',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: '[data-db-form-child], [data-db-type=heading], [data-db-type=text], [data-db-type=divider]',
      classes: ['db-form'],
      attributes: {
        'data-db-type': 'form',
        'data-db-form': 'true',
        method: 'post',
        enctype: 'multipart/form-data',
        novalidate: 'novalidate',
        'data-db-recipe': 'formspree',
        'data-db-submit-mode': 'fetch',
        'data-db-success-message': formTextDefaults.successMessage,
        'data-db-error-message': formTextDefaults.errorMessage,
        'data-db-failure-message': formTextDefaults.failureMessage,
      },
      components: buildFormDefaultChildren(formTextDefaults),
      script: runFormBehavior,
      traits: buildFormTraitDefinitions(),
    },
  },
});

export default buildFormTypeDefinition;
