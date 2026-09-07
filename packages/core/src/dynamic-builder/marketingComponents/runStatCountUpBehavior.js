const runStatCountUpBehavior = () => {
  const isEditorCanvas = Boolean(document.body && document.body.getAttribute('data-gjs-type') === 'wrapper');
  const localeCode = document.documentElement.lang || undefined;
  document.querySelectorAll('[data-db-stat-target]').forEach((statElement) => {
    if (statElement.dataset.dbStatReady) return;
    statElement.dataset.dbStatReady = 'true';
    const valueElement = statElement.querySelector('[data-db-stat-value]') || statElement;
    const targetText = String(statElement.getAttribute('data-db-stat-target') || '0').trim();
    const decimalPart = targetText.split('.')[1] || '';
    const decimalCount = Math.min(3, decimalPart.replace(/[^0-9]/g, '').length);
    const parsedTarget = parseFloat(targetText);
    const targetValue = isNaN(parsedTarget) ? 0 : parsedTarget;
    const renderStatValue = (numericValue) => {
      const prefixText = statElement.getAttribute('data-db-stat-prefix') || '';
      const suffixText = statElement.getAttribute('data-db-stat-suffix') || '';
      let numberText = '';
      try {
        numberText = numericValue.toLocaleString(localeCode, {
          minimumFractionDigits: decimalCount,
          maximumFractionDigits: decimalCount,
        });
      } catch (formatError) {
        numberText = numericValue.toFixed(decimalCount);
      }
      valueElement.textContent = prefixText + numberText + suffixText;
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isEditorCanvas || prefersReducedMotion || !window.IntersectionObserver || !window.requestAnimationFrame) {
      renderStatValue(targetValue);
      return;
    }
    const animateStatValue = () => {
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
