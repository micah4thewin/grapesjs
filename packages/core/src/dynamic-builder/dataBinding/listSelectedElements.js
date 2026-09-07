const listSelectedElements = (editor) => {
  const selectedComponents = editor.getSelectedAll ? editor.getSelectedAll() : [];
  return (selectedComponents || [])
    .map((selectedComponent) => (selectedComponent && selectedComponent.getEl ? selectedComponent.getEl() : null))
    .filter(Boolean);
};

export default listSelectedElements;
