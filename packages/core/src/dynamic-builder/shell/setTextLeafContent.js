const setTextLeafContent = (targetComponent, textValue) => {
  if (!targetComponent || !targetComponent.components) return false;
  targetComponent.components(String(textValue));
  return true;
};

export default setTextLeafContent;
