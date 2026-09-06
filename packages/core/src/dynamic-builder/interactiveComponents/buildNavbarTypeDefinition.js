import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildNavbarInnerMarkup from './buildNavbarInnerMarkup.js';
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
        'data-db-open': 'false',
        'data-db-layout': 'end',
        'data-db-cta': 'true',
      },
      components: buildNavbarInnerMarkup(interactiveTextDefaults),
      script: runNavbarBehavior,
      traits: [
        {
          type: 'db-menu-items',
          name: 'dbMenuItems',
          label: 'Menu items',
          listSelector: '[data-db-navbar-menu]',
          itemMarkup:
            '<li class="db-navbar-item" data-db-navbar-item="true"><a class="db-navbar-link" href="#">New link</a></li>',
          addLabel: 'Add menu item',
          emptyMessage: 'No menu items yet. Add your first link below.',
        },
        {
          type: 'select',
          name: 'data-db-layout',
          label: 'Layout',
          options: [
            { id: 'end', label: 'Links on the right' },
            { id: 'split', label: 'Links centered' },
            { id: 'center', label: 'Stacked and centered' },
          ],
          default: 'end',
        },
        {
          type: 'checkbox',
          name: 'data-db-sticky',
          label: 'Stick to top',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
        {
          type: 'checkbox',
          name: 'data-db-cta',
          label: 'Show call to action',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
      ],
    },
  },
});

export default buildNavbarTypeDefinition;
