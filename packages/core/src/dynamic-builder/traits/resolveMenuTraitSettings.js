const resolveMenuTraitSettings = (trait) => ({
  listSelector: (trait && trait.get('listSelector')) || '[data-db-navbar-menu]',
  itemMarkup: (trait && trait.get('itemMarkup')) || '<li><a href="#">New link</a></li>',
  addLabel: (trait && trait.get('addLabel')) || 'Add menu item',
  emptyMessage: (trait && trait.get('emptyMessage')) || 'No items yet. Add your first one below.',
});

export default resolveMenuTraitSettings;
