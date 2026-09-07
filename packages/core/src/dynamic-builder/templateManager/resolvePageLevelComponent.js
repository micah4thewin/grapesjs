const resolvePageLevelComponent = (editor) => {
  const wrapperComponent = editor.getWrapper();
  let cursorComponent = editor.getSelected && editor.getSelected();
  while (cursorComponent && cursorComponent.parent && cursorComponent.parent() !== wrapperComponent) {
    cursorComponent = cursorComponent.parent();
  }
  const parentComponent = cursorComponent && cursorComponent.parent && cursorComponent.parent();
  return parentComponent === wrapperComponent ? cursorComponent : null;
};

export default resolvePageLevelComponent;
