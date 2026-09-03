import normalizeFlowRecord from './normalizeFlowRecord.js';

const parseFlowRecords = (serializedFlows) => {
  const flowsText = String(serializedFlows == null ? '' : serializedFlows).trim();
  if (!flowsText) return [];
  let parsedValue = null;
  try {
    parsedValue = JSON.parse(flowsText);
  } catch (parseError) {
    return [];
  }
  if (!Array.isArray(parsedValue)) return [];
  return parsedValue.map((rawRecord) => normalizeFlowRecord(rawRecord)).filter(Boolean);
};

export default parseFlowRecords;
