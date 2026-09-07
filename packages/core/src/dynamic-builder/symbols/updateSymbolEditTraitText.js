const updateSymbolEditTraitText = (instanceComponent, isEditing) => {
  const editTrait =
    instanceComponent && typeof instanceComponent.getTrait === 'function'
      ? instanceComponent.getTrait('db-symbol-edit')
      : null;
  if (!editTrait || typeof editTrait.set !== 'function') return;
  editTrait.set('text', isEditing ? 'Done editing everywhere' : 'Edit everywhere');
  editTrait.trigger('change:label', editTrait);
};

export default updateSymbolEditTraitText;
