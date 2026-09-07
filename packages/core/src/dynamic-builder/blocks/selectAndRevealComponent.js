const selectAndRevealComponent = (editor, targetComponent) => {
  if (!targetComponent) return;
  editor.select(targetComponent);
  const targetElement = targetComponent.getEl && targetComponent.getEl();
  targetElement && targetElement.scrollIntoView && targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
};

export default selectAndRevealComponent;
