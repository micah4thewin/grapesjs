const buildColumnsContentRecord = (presetKey, columnChildrenList) => ({
  type: 'db-columns',
  attributes: { 'data-db-columns': presetKey },
  components: columnChildrenList.map((columnChildren) =>
    columnChildren ? { type: 'db-column', components: columnChildren } : { type: 'db-column' },
  ),
});

export default buildColumnsContentRecord;
