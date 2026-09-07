const listRepeatersAcrossPages = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const repeaterEntries = [];
  pageList.forEach((sitePage) => {
    const mainComponent = sitePage && sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    if (!mainComponent || !mainComponent.findType) return;
    mainComponent
      .findType('db-repeater')
      .forEach((repeaterComponent) => repeaterEntries.push({ page: sitePage, component: repeaterComponent }));
  });
  return repeaterEntries;
};

export default listRepeatersAcrossPages;
