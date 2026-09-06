const resolveSymbolIdOfComponent = (component) => {
  if (!component || typeof component.getAttributes !== 'function') return '';
  return String(component.getAttributes()['data-db-symbol'] || '');
};

export default resolveSymbolIdOfComponent;
