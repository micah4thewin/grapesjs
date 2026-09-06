const hasTouchSupport = (ownerDocument) => {
  const ownerWindow = ownerDocument && ownerDocument.defaultView;
  if (!ownerWindow) return false;
  if (typeof ownerWindow.matchMedia === 'function') {
    try {
      if (ownerWindow.matchMedia('(any-pointer: coarse)').matches) return true;
    } catch (matchError) {
      return 'ontouchstart' in ownerWindow;
    }
  }
  return 'ontouchstart' in ownerWindow || Number(ownerWindow.navigator && ownerWindow.navigator.maxTouchPoints) > 0;
};

export default hasTouchSupport;
