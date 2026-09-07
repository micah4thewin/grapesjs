const prefersReducedMotion = (targetWindow) =>
  Boolean(
    targetWindow &&
      typeof targetWindow.matchMedia === 'function' &&
      targetWindow.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

export default prefersReducedMotion;
