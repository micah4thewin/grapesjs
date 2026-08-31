const buildRepeaterContentRecord = (sourceKey, itemChildRecords) => ({
  type: 'db-repeater',
  attributes: { 'data-db-source': sourceKey },
  components: [{ type: 'db-repeater-item', components: itemChildRecords }],
});

export default buildRepeaterContentRecord;
