import buildFormDefaultChildren from './buildFormDefaultChildren.js';
import runFormBehavior from './runFormBehavior.js';

const buildFormTypeDefinition = (formTextDefaults) => ({
  type: 'db-form',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'form') && { type: 'db-form' },
  model: {
    defaults: {
      tagName: 'form',
      name: 'Form',
      draggable: true,
      droppable: '[data-db-form-child]',
      classes: ['db-form'],
      attributes: {
        'data-db-type': 'form',
        'data-db-form': 'true',
        method: 'post',
        novalidate: 'novalidate',
        'data-db-success-message': formTextDefaults.successMessage,
        'data-db-error-message': formTextDefaults.errorMessage,
      },
      components: buildFormDefaultChildren(formTextDefaults),
      script: runFormBehavior,
      traits: [
        { type: 'db-url', name: 'action', label: 'Action URL', placeholder: 'https://example.com/submit' },
        {
          type: 'select',
          name: 'method',
          label: 'Method',
          options: [
            { id: 'post', label: 'POST' },
            { id: 'get', label: 'GET' },
          ],
        },
        { type: 'text', name: 'name', label: 'Form name' },
        { type: 'text', name: 'data-db-success-message', label: 'Success message' },
        { type: 'text', name: 'data-db-error-message', label: 'Error message' },
      ],
    },
  },
});

export default buildFormTypeDefinition;
