import resolvePageLevelComponent from './resolvePageLevelComponent.js';

const resolveTemplateSourceComponents = (editor, kindName) => {
  if (kindName === 'page') return editor.getWrapper().components().models.slice();
  const selectedComponent = editor.getSelected && editor.getSelected();
  const pageLevelComponent = resolvePageLevelComponent(editor);
  const sourceComponent = pageLevelComponent || selectedComponent;
  return sourceComponent ? [sourceComponent] : [];
};

export default resolveTemplateSourceComponents;
