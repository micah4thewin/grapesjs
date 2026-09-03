import createFlowIdentifier from './createFlowIdentifier.js';
import getFlowActionRecords from './getFlowActionRecords.js';
import getFlowTriggerRecords from './getFlowTriggerRecords.js';
import isPlainRecord from '../support/isPlainRecord.js';

const normalizeOptionsRecord = (rawOptions, fieldRecords) => {
  const normalizedOptions = {};
  const sourceRecord = isPlainRecord(rawOptions) ? rawOptions : {};
  fieldRecords.forEach((fieldRecord) => {
    const rawValue = sourceRecord[fieldRecord.name];
    if (rawValue === undefined || rawValue === null) return;
    normalizedOptions[fieldRecord.name] = String(rawValue);
  });
  return normalizedOptions;
};

const normalizeFlowRecord = (rawRecord) => {
  if (!isPlainRecord(rawRecord)) return null;
  const triggerRecords = getFlowTriggerRecords();
  const actionRecords = getFlowActionRecords();
  const triggerRecord =
    triggerRecords.find((candidate) => candidate.id === String(rawRecord.trigger)) || triggerRecords[0];
  const rawActions = Array.isArray(rawRecord.actions) ? rawRecord.actions : [];
  const normalizedActions = rawActions
    .map((rawAction) => {
      if (!isPlainRecord(rawAction)) return null;
      const actionRecord = actionRecords.find((candidate) => candidate.id === String(rawAction.type));
      if (!actionRecord) return null;
      return { type: actionRecord.id, options: normalizeOptionsRecord(rawAction.options, actionRecord.fields) };
    })
    .filter(Boolean);
  return {
    id: String(rawRecord.id || createFlowIdentifier()),
    trigger: triggerRecord.id,
    triggerOptions: normalizeOptionsRecord(rawRecord.triggerOptions, triggerRecord.fields),
    actions: normalizedActions,
  };
};

export default normalizeFlowRecord;
