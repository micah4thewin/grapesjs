const hasCustomScriptStep = (flowRecords) =>
  flowRecords.some((flowRecord) =>
    (flowRecord.actions || []).some((actionRecord) => actionRecord.type === 'custom-js'),
  );

const describeFlowSaveNotice = (flowRecords, allowScripts) => {
  if (!flowRecords.length) return { text: 'Flows cleared.', kind: 'success', duration: 3200 };
  if (!allowScripts && hasCustomScriptStep(flowRecords)) {
    return {
      text: 'Flows saved. "Run custom JavaScript" stays off until you turn on Allow script tags in Custom code.',
      kind: 'warning',
      duration: 6000,
    };
  }
  return { text: 'Flows saved.', kind: 'success', duration: 3200 };
};

export default describeFlowSaveNotice;
