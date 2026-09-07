const runLogoMarqueeBehavior = () => {
  const isEditorCanvas = Boolean(document.body && document.body.getAttribute('data-gjs-type') === 'wrapper');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-db-type="logo-cloud"][data-db-marquee="true"]').forEach((cloudElement) => {
    if (cloudElement.dataset.dbReady) return;
    cloudElement.dataset.dbReady = 'true';
    if (isEditorCanvas || prefersReducedMotion) return;
    const originalItems = Array.from(cloudElement.children);
    if (originalItems.length < 2) return;
    const measureShift = () => {
      const gapValue = parseFloat(window.getComputedStyle(cloudElement).columnGap) || 0;
      let originalWidth = 0;
      originalItems.forEach((itemElement) => {
        originalWidth += itemElement.getBoundingClientRect().width + gapValue;
      });
      cloudElement.style.setProperty('--db-marquee-shift', '-' + Math.round(originalWidth) + 'px');
      cloudElement.style.setProperty('--db-marquee-duration', Math.max(18, Math.round(originalWidth / 40)) + 's');
    };
    originalItems.forEach((itemElement) => {
      const clonedItem = itemElement.cloneNode(true);
      clonedItem.setAttribute('aria-hidden', 'true');
      clonedItem.querySelectorAll('a, button').forEach((focusableElement) => {
        focusableElement.setAttribute('tabindex', '-1');
      });
      cloudElement.appendChild(clonedItem);
    });
    measureShift();
    cloudElement.setAttribute('data-db-marquee-active', 'true');
    let resizeFrame = 0;
    window.addEventListener('resize', () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        measureShift();
      });
    });
  });
};

export default runLogoMarqueeBehavior;
