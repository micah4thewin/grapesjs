const buildCheckboxTrait = (attributeName, labelText, defaultValue) => ({
  type: 'checkbox',
  name: attributeName,
  label: labelText,
  valueTrue: 'true',
  valueFalse: 'false',
  default: defaultValue,
});

const buildNavbarTraitDefinitions = () => [
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
    type: 'button',
    name: 'dbNavbarBuildMenu',
    label: '',
    text: 'Build menu from pages',
    full: true,
    command: 'db:navbar-build-menu',
  },
  buildCheckboxTrait('data-db-menu-auto', 'Keep menu in sync with pages', 'false'),
  {
    type: 'select',
    name: 'data-db-layout',
    label: 'Layout',
    options: [
      { id: 'end', label: 'Right' },
      { id: 'split', label: 'Center' },
      { id: 'center', label: 'Stacked' },
    ],
    default: 'end',
  },
  buildCheckboxTrait('data-db-sticky', 'Stick to top', 'false'),
  {
    type: 'select',
    name: 'data-db-scroll',
    label: 'On scroll',
    default: 'none',
    options: [
      { id: 'none', label: 'Keep in place' },
      { id: 'hide', label: 'Hide when scrolling down' },
      { id: 'shrink', label: 'Shrink after scrolling' },
      { id: 'transparent', label: 'See-through at the top' },
    ],
  },
  buildCheckboxTrait('data-db-cta', 'Show call to action', 'true'),
  { type: 'db-asset', name: 'data-db-logo', label: 'Logo image' },
  buildCheckboxTrait('data-db-brand-text', 'Show brand name', 'true'),
];

export default buildNavbarTraitDefinitions;
