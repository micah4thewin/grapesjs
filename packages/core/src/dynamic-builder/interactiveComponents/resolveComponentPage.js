const resolveComponentPage = (editor, component) => {
  let rootComponent = component || null;
  while (rootComponent && typeof rootComponent.parent === 'function' && rootComponent.parent()) {
    rootComponent = rootComponent.parent();
  }
  if (!rootComponent) return null;
  const pageList = editor && editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  return (
    pageList.find((sitePage) => (sitePage.getMainComponent ? sitePage.getMainComponent() : null) === rootComponent) ||
    null
  );
};

export default resolveComponentPage;
