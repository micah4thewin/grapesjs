import buildNavbarInnerMarkup from './buildNavbarInnerMarkup.js';
import runNavbarBehavior from './runNavbarBehavior.js';

const buildNavbarTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-navbar',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'navbar') && { type: 'db-navbar' },
  model: {
    defaults: {
      tagName: 'header',
      name: 'Navbar',
      draggable: true,
      droppable: false,
      classes: ['db-navbar'],
      attributes: {
        'data-db-type': 'navbar',
        'data-db-navbar': 'true',
        'data-db-sticky': 'false',
        'data-db-open': 'false',
      },
      components: buildNavbarInnerMarkup(interactiveTextDefaults),
      script: runNavbarBehavior,
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-sticky',
          label: 'Stick to top',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
      ],
    },
  },
});

export default buildNavbarTypeDefinition;
