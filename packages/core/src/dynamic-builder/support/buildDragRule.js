const buildDragRule = (acceptedTargetTypeNames) => (sourceComponent, targetComponent) => {
  const targetType = targetComponent && targetComponent.get ? String(targetComponent.get('type') || '') : '';
  return acceptedTargetTypeNames.indexOf(targetType) >= 0;
};

export default buildDragRule;
