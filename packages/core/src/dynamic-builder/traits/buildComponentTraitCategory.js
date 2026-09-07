const buildComponentTraitCategory = (selectedComponent) => {
  const componentName = String(
    selectedComponent && selectedComponent.getName ? selectedComponent.getName() : '',
  ).trim();
  return { id: 'db-component', label: `${componentName || 'Element'} settings`, open: true };
};

export default buildComponentTraitCategory;
