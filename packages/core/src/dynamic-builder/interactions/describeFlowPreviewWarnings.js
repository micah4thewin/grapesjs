import describeTargetMatches from './describeTargetMatches.js';

const describeFlowPreviewWarnings = (canvasDocument, flowRecords) => {
  const warnings = [];
  const addWarning = (warningText) => {
    if (warnings.indexOf(warningText) < 0) warnings.push(warningText);
  };
  flowRecords.forEach((flowRecord) => {
    flowRecord.actions.forEach((actionRecord) => {
      const options = actionRecord.options || {};
      if (actionRecord.type === 'open-url' || actionRecord.type === 'submit-form') {
        addWarning('Links and form submits are not followed in preview.');
      }
      if (options.target !== undefined && String(options.target).trim()) {
        const matchRecord = describeTargetMatches(canvasDocument, options.target);
        if (matchRecord.state === 'empty' || matchRecord.state === 'invalid') {
          addWarning('Target "' + String(options.target).trim() + '": ' + matchRecord.text);
        }
      }
    });
  });
  return warnings;
};

export default describeFlowPreviewWarnings;
