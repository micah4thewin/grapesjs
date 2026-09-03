import getFlowActionRecords from './getFlowActionRecords.js';
import getFlowTriggerRecords from './getFlowTriggerRecords.js';

const describeFlowSummary = (flowRecords) => {
  if (!flowRecords.length) return 'No flows yet';
  const triggerRecords = getFlowTriggerRecords();
  const actionRecords = getFlowActionRecords();
  if (flowRecords.length > 1) {
    const stepCount = flowRecords.reduce((runningTotal, flowRecord) => runningTotal + flowRecord.actions.length, 0);
    return flowRecords.length + ' flows, ' + stepCount + ' steps';
  }
  const onlyFlow = flowRecords[0];
  const triggerRecord = triggerRecords.find((candidate) => candidate.id === onlyFlow.trigger);
  const firstAction = onlyFlow.actions[0];
  const actionRecord = firstAction && actionRecords.find((candidate) => candidate.id === firstAction.type);
  const triggerLabel = triggerRecord ? triggerRecord.label : 'Trigger';
  if (!actionRecord) return triggerLabel + ', no steps yet';
  const extraCount = onlyFlow.actions.length - 1;
  return triggerLabel + ': ' + actionRecord.label + (extraCount > 0 ? ' +' + extraCount + ' more' : '');
};

export default describeFlowSummary;
