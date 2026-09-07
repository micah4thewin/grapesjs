import parseFlowRecords from './parseFlowRecords.js';

const collectCanvasFlowRecords = (canvasDocument) => {
  if (!canvasDocument || !canvasDocument.querySelectorAll) return [];
  const flowRecords = [];
  canvasDocument.querySelectorAll('[data-db-flows]').forEach((element) => {
    parseFlowRecords(element.getAttribute('data-db-flows')).forEach((flowRecord) => flowRecords.push(flowRecord));
  });
  return flowRecords;
};

export default collectCanvasFlowRecords;
