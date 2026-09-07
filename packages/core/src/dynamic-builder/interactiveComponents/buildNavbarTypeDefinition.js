import buildNavbarInnerMarkup from './buildNavbarInnerMarkup.js';
import buildNavbarTraitDefinitions from './buildNavbarTraitDefinitions.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import runNavbarBehavior from './runNavbarBehavior.js';

const buildNavbarTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-navbar',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'navbar') && { type: 'db-navbar' },
  model: {
    defaults: {
      tagName: 'header',
      name: 'Navbar',
      draggable: getDropTargetSelectors().pageOnly,
      droppable: false,
      classes: ['db-navbar'],
      attributes: {
        'data-db-type': 'navbar',
        'data-db-navbar': 'true',
        'data-db-sticky': 'false',
        'data-db-scroll': 'none',
        'data-db-open': 'false',
        'data-db-layout': 'end',
        'data-db-cta': 'true',
        'data-db-brand-text': 'true',
        'data-db-menu-auto': 'false',
      },
      components: buildNavbarInnerMarkup(interactiveTextDefaults),
      script: runNavbarBehavior,
      traits: buildNavbarTraitDefinitions(),
    },
  },
});

export default buildNavbarTypeDefinition;
