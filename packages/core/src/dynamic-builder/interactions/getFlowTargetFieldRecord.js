const getFlowTargetFieldRecord = (placeholderText) => ({
  name: 'target',
  label: 'Target',
  type: 'target',
  placeholder: placeholderText || 'This element, or #id / .class',
});

export default getFlowTargetFieldRecord;
