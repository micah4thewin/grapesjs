const buildTemplateButtonGroupRecord = (buttonRecords, alignName) => ({
  type: 'db-button-group',
  attributes: { 'data-db-align': alignName || 'start' },
  components: buttonRecords,
});

export default buildTemplateButtonGroupRecord;
