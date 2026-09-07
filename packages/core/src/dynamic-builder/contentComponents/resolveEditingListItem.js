const resolveEditingListItem = (editor) => {
  const editingComponent = editor.getEditing && editor.getEditing();
  if (!editingComponent || !editingComponent.get || editingComponent.get('tagName') !== 'li') return null;
  const parentComponent = editingComponent.parent && editingComponent.parent();
  return parentComponent && parentComponent.is && parentComponent.is('db-list') ? editingComponent : null;
};

export default resolveEditingListItem;
