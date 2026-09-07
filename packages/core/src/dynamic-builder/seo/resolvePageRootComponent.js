const resolvePageRootComponent = (editor, page) => {
  if (page && page.getMainComponent) {
    const mainComponent = page.getMainComponent();
    if (mainComponent) return mainComponent;
  }
  return editor.getWrapper ? editor.getWrapper() : null;
};

export default resolvePageRootComponent;
