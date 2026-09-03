const isSymbolInstanceEditing = (instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.getAttributes !== 'function') return false;
  return instanceComponent.getAttributes()['data-db-symbol-editing'] === 'true';
};

export default isSymbolInstanceEditing;
