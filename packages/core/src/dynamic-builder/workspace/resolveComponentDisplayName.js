const resolveComponentDisplayName = (selectedComponent) => {
  if (!selectedComponent) return '';
  const readableName = selectedComponent.getName ? String(selectedComponent.getName() || '').trim() : '';
  if (readableName) return readableName;
  const typeName = selectedComponent.get ? String(selectedComponent.get('type') || '').trim() : '';
  return typeName || 'Element';
};

export default resolveComponentDisplayName;
