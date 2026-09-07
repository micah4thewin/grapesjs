const buildColumnsContentRecord = (presetKey, columnChildrenList, recordName) => ({
  type: 'db-columns',
  ...(recordName ? { name: recordName } : {}),
  attributes: { 'data-db-columns': presetKey },
  components: columnChildrenList.map((columnChildren) =>
    columnChildren ? { type: 'db-column', components: columnChildren } : { type: 'db-column' },
  ),
});

export default buildColumnsContentRecord;
