const runCarouselBehavior = () => {
  document.querySelectorAll('[data-db-type="carousel"]').forEach((carouselElement) => {
    if (carouselElement.dataset.dbCarouselReady) return;
    carouselElement.dataset.dbCarouselReady = 'true';
    const trackElement = carouselElement.querySelector('[data-db-carousel-track]');
    const dotsElement = carouselElement.querySelector('[data-db-carousel-dots]');
    const statusElement = carouselElement.querySelector('[data-db-carousel-status]');
    if (!trackElement) return;
    const carouselState = { index: 0, timer: null, paused: false, pointerStart: null };
    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const readSlides = () => Array.prototype.slice.call(trackElement.children);
    const announceSlide = () =>
      statusElement &&
      (statusElement.textContent = 'Slide ' + (carouselState.index + 1) + ' of ' + readSlides().length);
    const renderDots = () => {
      if (!dotsElement) return;
      const slideCount = readSlides().length;
      while (dotsElement.children.length > slideCount) dotsElement.removeChild(dotsElement.lastChild);
      while (dotsElement.children.length < slideCount) {
        const dotButton = document.createElement('button');
        dotButton.type = 'button';
        dotButton.className = 'db-carousel-dot';
        dotsElement.appendChild(dotButton);
      }
      Array.prototype.forEach.call(dotsElement.children, (dotButton, dotIndex) => {
        dotButton.setAttribute('aria-label', 'Go to slide ' + (dotIndex + 1));
        if (dotIndex === carouselState.index) dotButton.setAttribute('aria-current', 'true');
        else dotButton.removeAttribute('aria-current');
      });
    };
    const goToSlide = (targetIndex) => {
      const slideList = readSlides();
      if (!slideList.length) return;
      const loopEnabled = carouselElement.getAttribute('data-db-loop') !== 'false';
      const boundedIndex = Math.max(0, Math.min(slideList.length - 1, targetIndex));
      const nextIndex = loopEnabled ? (targetIndex + slideList.length) % slideList.length : boundedIndex;
      carouselState.index = nextIndex;
      const scrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
      trackElement.scrollTo({ left: nextIndex * trackElement.clientWidth, behavior: scrollBehavior });
      renderDots();
      announceSlide();
    };
    const scheduleAutoplay = () => {
      window.clearTimeout(carouselState.timer);
      const intervalValue = parseInt(carouselElement.getAttribute('data-db-interval') || '5000', 10);
      const intervalMs = Math.max(2000, intervalValue || 5000);
      carouselState.timer = window.setTimeout(() => {
        const autoplayEnabled = carouselElement.getAttribute('data-db-autoplay') === 'true';
        if (autoplayEnabled && !carouselState.paused && !prefersReducedMotion())
          goToSlide((carouselState.index + 1) % readSlides().length);
        scheduleAutoplay();
      }, intervalMs);
    };
    const prevButton = carouselElement.querySelector('[data-db-carousel-prev]');
    const nextButton = carouselElement.querySelector('[data-db-carousel-next]');
    if (prevButton) prevButton.addEventListener('click', () => goToSlide(carouselState.index - 1));
    if (nextButton) nextButton.addEventListener('click', () => goToSlide(carouselState.index + 1));
    if (dotsElement)
      dotsElement.addEventListener('click', (clickEvent) => {
        const clickTarget = clickEvent.target;
        const dotButton = clickTarget && clickTarget.closest ? clickTarget.closest('.db-carousel-dot') : null;
        if (!dotButton) return;
        goToSlide(Array.prototype.indexOf.call(dotsElement.children, dotButton));
      });
    carouselElement.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') return;
      keyEvent.preventDefault();
      goToSlide(keyEvent.key === 'ArrowLeft' ? carouselState.index - 1 : carouselState.index + 1);
    });
    trackElement.addEventListener('pointerdown', (pointerEvent) => (carouselState.pointerStart = pointerEvent.clientX));
    trackElement.addEventListener('pointerup', (pointerEvent) => {
      if (carouselState.pointerStart === null) return;
      const pointerDelta = pointerEvent.clientX - carouselState.pointerStart;
      carouselState.pointerStart = null;
      if (pointerDelta > 40) goToSlide(carouselState.index - 1);
      if (pointerDelta < -40) goToSlide(carouselState.index + 1);
    });
    trackElement.addEventListener('pointercancel', () => (carouselState.pointerStart = null));
    carouselElement.addEventListener('mouseenter', () => (carouselState.paused = true));
    carouselElement.addEventListener('mouseleave', () => (carouselState.paused = false));
    carouselElement.addEventListener('focusin', () => (carouselState.paused = true));
    carouselElement.addEventListener('focusout', () => (carouselState.paused = false));
    renderDots();
    announceSlide();
    scheduleAutoplay();
  });
};

export default runCarouselBehavior;
