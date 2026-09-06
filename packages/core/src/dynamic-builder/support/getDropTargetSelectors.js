const getDropTargetSelectors = () => ({
  pageOnly: '[data-gjs-type=wrapper]',
  sectionBody: '[data-gjs-type=wrapper], [data-db-type=section], [data-db-type=container]',
  anyLayout: '[data-gjs-type=wrapper], [data-db-type=section], [data-db-type=container], [data-db-type=column]',
});

export default getDropTargetSelectors;
