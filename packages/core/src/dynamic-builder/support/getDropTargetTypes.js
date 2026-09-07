const getDropTargetTypes = () => ({
  pageOnly: ['wrapper'],
  sectionBody: ['wrapper', 'db-section', 'db-container'],
  anyLayout: ['wrapper', 'db-section', 'db-container', 'db-column'],
});

export default getDropTargetTypes;
