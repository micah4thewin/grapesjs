const runCoverBehavior = () => {
  document.querySelectorAll('[data-db-cover]').forEach((coverElement) => {
    if (coverElement.dataset.dbCoverReady) return;
    coverElement.dataset.dbCoverReady = 'true';
    const mediaElement = coverElement.querySelector('[data-db-cover-media]');
    if (!mediaElement) return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isVideo = mediaElement.tagName === 'VIDEO';
    if (isVideo) {
      const isPhone = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
      const posterOnly = reduceMotion || (isPhone && coverElement.getAttribute('data-db-mobile-poster') === 'true');
      if (posterOnly) {
        mediaElement.removeAttribute('autoplay');
        mediaElement.removeAttribute('src');
        mediaElement.load();
        return;
      }
      mediaElement.muted = true;
      const playWhenVisible = (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) mediaElement.play().catch(() => {});
          else mediaElement.pause();
        });
      if (typeof IntersectionObserver === 'function')
        new IntersectionObserver(playWhenVisible, { threshold: 0.1 }).observe(coverElement);
      else mediaElement.play().catch(() => {});
      return;
    }
    if (reduceMotion || coverElement.getAttribute('data-db-parallax') !== 'true') return;
    const isDesktop = window.matchMedia && window.matchMedia('(min-width: 900px)').matches;
    if (!isDesktop) return;
    let ticking = false;
    const updateOffset = () => {
      const bounds = coverElement.getBoundingClientRect();
      const offset = Math.max(-bounds.height, Math.min(bounds.height, bounds.top * -0.22));
      mediaElement.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0) scale(1.15)';
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateOffset);
      },
      { passive: true },
    );
    updateOffset();
  });
};

export default runCoverBehavior;
