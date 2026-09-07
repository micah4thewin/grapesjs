import buildAlertButtonFlowRecord from './buildAlertButtonFlowRecord.js';

const followUpTypes = ['open-url', 'submit-form'];

const isAlertLedFlow = (flowRecord) =>
  flowRecord.trigger === 'click' && flowRecord.actions.some((actionRecord) => actionRecord.type === 'alert');

const mergeAlertFlowIntoRecords = (existingFlows, attributesRecord) => {
  const trackedFlow = existingFlows.find(isAlertLedFlow);
  const generatedFlow = buildAlertButtonFlowRecord(attributesRecord, trackedFlow && trackedFlow.id);
  if (!trackedFlow) return [generatedFlow, ...existingFlows];
  const alertIndex = trackedFlow.actions.findIndex((actionRecord) => actionRecord.type === 'alert');
  const followingAction = trackedFlow.actions[alertIndex + 1];
  const hasGeneratedFollowUp = !!followingAction && followUpTypes.indexOf(followingAction.type) >= 0;
  const untouchedActions = trackedFlow.actions.filter(
    (actionRecord, actionIndex) =>
      actionIndex !== alertIndex && !(hasGeneratedFollowUp && actionIndex === alertIndex + 1),
  );
  const mergedActions = [
    ...untouchedActions.slice(0, alertIndex),
    ...generatedFlow.actions,
    ...untouchedActions.slice(alertIndex),
  ];
  return existingFlows.map((flowRecord) =>
    flowRecord === trackedFlow ? { ...trackedFlow, actions: mergedActions } : flowRecord,
  );
};

export default mergeAlertFlowIntoRecords;
