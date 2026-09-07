const scrollTourTargetIntoView = (targetElement) => {
  if (!targetElement || typeof targetElement.scrollIntoView !== 'function') return false;
  const ownerDocument = targetElement.ownerDocument;
  const targetWindow = ownerDocument && ownerDocument.defaultView;
  const prefersReducedMotion = Boolean(
    targetWindow &&
      typeof targetWindow.matchMedia === 'function' &&
      targetWindow.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  targetElement.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
  return true;
};

export default scrollTourTargetIntoView;
