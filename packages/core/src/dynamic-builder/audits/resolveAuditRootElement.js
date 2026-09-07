const resolveAuditRootElement = (wrapperComponent, canvasBody) => {
  const wrapperElement = wrapperComponent && wrapperComponent.getEl ? wrapperComponent.getEl() : null;
  if (!wrapperElement || !canvasBody) return canvasBody || null;
  return wrapperElement === canvasBody || canvasBody.contains(wrapperElement) ? wrapperElement : canvasBody;
};

export default resolveAuditRootElement;
