const resolveSymbolInsertIndex = (rootComponent, placement) => {
  if (placement === 'top') return 0;
  const childComponents = rootComponent && rootComponent.components ? rootComponent.components() : null;
  return childComponents ? childComponents.length : 0;
};

export default resolveSymbolInsertIndex;
