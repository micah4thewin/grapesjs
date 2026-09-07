const readViewEvents = (viewClass) => {
  const eventsValue = viewClass && viewClass.prototype ? viewClass.prototype.events : null;
  if (typeof eventsValue === 'function') return eventsValue.call(viewClass.prototype) || {};
  return eventsValue || {};
};

const needsEventsReader = (viewClass) => {
  if (!viewClass) return false;
  if (typeof viewClass.getEvents !== 'function') return true;
  return Boolean(viewClass.dbViewEventsOwner) && viewClass.dbViewEventsOwner !== viewClass;
};

const ensureComponentTypeViewEvents = (editor) => {
  const componentsModule = editor && editor.DomComponents;
  const typeRecords = componentsModule && componentsModule.getTypes ? componentsModule.getTypes() : [];
  let patchedCount = 0;
  typeRecords.forEach((typeRecord) => {
    const viewClass = typeRecord && typeRecord.view;
    if (!needsEventsReader(viewClass)) return;
    viewClass.dbViewEventsOwner = viewClass;
    viewClass.getEvents = () => readViewEvents(viewClass);
    patchedCount += 1;
  });
  return patchedCount;
};

export default ensureComponentTypeViewEvents;
