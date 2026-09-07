const restoreComponentTypeViewStatics = (editor) => {
  const domComponents = editor && editor.DomComponents;
  if (!domComponents || !domComponents.getTypes || !domComponents.getType) return 0;
  const defaultType = domComponents.getType('default');
  const baseGetEvents = defaultType && defaultType.view && defaultType.view.getEvents;
  if (typeof baseGetEvents !== 'function') return 0;
  const typeRecords = domComponents.getTypes() || [];
  return typeRecords.reduce((repairedCount, typeRecord) => {
    const viewClass = typeRecord && typeRecord.view;
    if (typeof viewClass !== 'function' || typeof viewClass.getEvents === 'function') return repairedCount;
    viewClass.getEvents = baseGetEvents;
    return repairedCount + 1;
  }, 0);
};

export default restoreComponentTypeViewStatics;
