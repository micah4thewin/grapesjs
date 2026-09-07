import findAncestorOfType from './findAncestorOfType.js';

const resolveSelectedMediaContainer = (editor, typeName) => {
  const selectedComponent = editor.getSelected && editor.getSelected();
  if (!selectedComponent || !selectedComponent.is) return null;
  if (selectedComponent.is(typeName)) return selectedComponent;
  return findAncestorOfType(selectedComponent, typeName);
};

export default resolveSelectedMediaContainer;
