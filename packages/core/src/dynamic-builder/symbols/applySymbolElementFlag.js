const applySymbolElementFlag = (component, attributeName, isOn) => {
  const targetElement = component && typeof component.getEl === 'function' ? component.getEl() : null;
  if (!targetElement || typeof targetElement.setAttribute !== 'function') return;
  if (isOn) targetElement.setAttribute(attributeName, 'true');
  else targetElement.removeAttribute(attributeName);
};

export default applySymbolElementFlag;
