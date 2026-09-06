const buildDropRule = (rejectedTypeNames) => (sourceComponent) => {
  const sourceType = sourceComponent && sourceComponent.get ? String(sourceComponent.get('type') || '') : '';
  return rejectedTypeNames.indexOf(sourceType) < 0;
};

export default buildDropRule;
