const resolveViewEventsRecord = (viewPrototype) => {
  const eventsValue = viewPrototype ? viewPrototype.events : null;
  if (typeof eventsValue === 'function') return eventsValue.call(viewPrototype) || {};
  return eventsValue || {};
};

export default resolveViewEventsRecord;
