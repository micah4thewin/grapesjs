const runStatCountUpBehavior = () => {
  document.querySelectorAll('[data-db-stat-target]').forEach((statElement) => {
    if (statElement.dataset.dbStatReady) return;
    statElement.dataset.dbStatReady = 'true';
    const renderStatValue = (numericValue) => {
      const prefixText = statElement.getAttribute('data-db-stat-prefix') || '';
      const suffixText = statElement.getAttribute('data-db-stat-suffix') || '';
      statElement.textContent = prefixText + Math.round(numericValue).toLocaleString('en-US') + suffixText;
    };
    const readTargetValue = () => {
      const parsedTarget = parseFloat(statElement.getAttribute('data-db-stat-target') || '0');
      return isNaN(parsedTarget) ? 0 : parsedTarget;
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !window.IntersectionObserver || !window.requestAnimationFrame) {
      renderStatValue(readTargetValue());
      return;
    }
    const animateStatValue = () => {
      const targetValue = readTargetValue();
      const durationMs = 1600;
      let startTimestamp = null;
      const stepFrame = (frameTimestamp) => {
        if (startTimestamp === null) startTimestamp = frameTimestamp;
        const progressRatio = Math.min(1, (frameTimestamp - startTimestamp) / durationMs);
        const easedRatio = 1 - Math.pow(1 - progressRatio, 3);
        renderStatValue(targetValue * easedRatio);
        if (progressRatio < 1) window.requestAnimationFrame(stepFrame);
      };
      window.requestAnimationFrame(stepFrame);
    };
    renderStatValue(0);
    const statObserver = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((observedEntry) => {
          if (!observedEntry.isIntersecting) return;
          statObserver.disconnect();
          animateStatValue();
        });
      },
      { threshold: 0.4 },
    );
    statObserver.observe(statElement);
  });
};

export default runStatCountUpBehavior;
