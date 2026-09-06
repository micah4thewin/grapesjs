const serializeFlowRecords = (flowRecords) => {
  const cleanRecords = (Array.isArray(flowRecords) ? flowRecords : []).filter(
    (flowRecord) => flowRecord && flowRecord.actions && flowRecord.actions.length,
  );
  return cleanRecords.length ? JSON.stringify(cleanRecords) : '';
};

export default serializeFlowRecords;
