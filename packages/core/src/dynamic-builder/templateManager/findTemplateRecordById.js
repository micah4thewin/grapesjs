const findTemplateRecordById = (viewState, templateId) =>
  [...viewState.pageRecords, ...viewState.sectionRecords, ...viewState.userRecords].find(
    (templateRecord) => templateRecord.templateId === templateId,
  ) || null;

export default findTemplateRecordById;
