const runCarouselBehavior = () => {
  document.querySelectorAll('[data-db-type="carousel"]').forEach((carouselElement) => {
    if (carouselElement.dataset.dbCarouselReady) return;
    carouselElement.dataset.dbCarouselReady = 'true';
    const trackElement = carouselElement.querySelector('[data-db-carousel-track]');
    const dotsElement = carouselElement.querySelector('[data-db-carousel-dots]');
    const statusElement = carouselElement.querySelector('[data-db-carousel-status]');
    const pauseButton = carouselElement.querySelector('[data-db-carousel-pause]');
    if (!trackElement) return;
    const carouselState = { index: 0, timer: null, hovered: false, stopped: false, pointerStart: null };
    const readAttribute = (attributeName, fallbackValue) =>
      carouselElement.getAttribute(attributeName) || fallbackValue;
    const isEditing = () => document.body.hasAttribute('data-db-editing');
    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loopEnabled = () => readAttribute('data-db-loop', 'true') !== 'false';
    const readSlides = () => Array.prototype.slice.call(trackElement.children);
    const labelSlides = () => {
      const slideList = readSlides();
      slideList.forEach((slideElement, slideIndex) => {
        const currentLabel = slideElement.getAttribute('aria-label');
        if (!currentLabel || currentLabel === 'Media slide')
          slideElement.setAttribute('aria-label', 'Slide ' + (slideIndex + 1) + ' of ' + slideList.length);
      });
      if (statusElement) statusElement.textContent = 'Slide ' + (carouselState.index + 1) + ' of ' + slideList.length;
    };
    const renderDots = () =>
      dotsElement &&
      Array.prototype.forEach.call(dotsElement.children, (dotButton, dotIndex) =>
        dotButton.setAttribute('aria-current', dotIndex === carouselState.index ? 'true' : 'false'),
      );
    const scrollToCurrent = (scrollBehavior) => {
      const targetLeft = carouselState.index * trackElement.clientWidth;
      if (trackElement.scrollTo) trackElement.scrollTo({ left: targetLeft, behavior: scrollBehavior });
      else trackElement.scrollLeft = targetLeft;
    };
    const goToSlide = (targetIndex) => {
      const slideCount = readSlides().length;
      if (!slideCount) return;
      const boundedIndex = Math.max(0, Math.min(slideCount - 1, targetIndex));
      carouselState.index = loopEnabled() ? (targetIndex + slideCount) % slideCount : boundedIndex;
      scrollToCurrent(prefersReducedMotion() ? 'auto' : 'smooth');
      renderDots();
      labelSlides();
    };
    const autoplayAllowed = () =>
      !carouselState.stopped && !carouselState.hovered && !document.hidden && !isEditing() && !prefersReducedMotion();
    const scheduleAutoplay = () => {
      window.clearTimeout(carouselState.timer);
      if (readAttribute('data-db-autoplay', 'false') !== 'true') return;
      const intervalMs = Math.max(2000, parseInt(readAttribute('data-db-interval', '5000'), 10) || 5000);
      carouselState.timer = window.setTimeout(() => {
        const onLastSlide = carouselState.index >= readSlides().length - 1;
        if (autoplayAllowed() && (loopEnabled() || !onLastSlide)) goToSlide(carouselState.index + 1);
        scheduleAutoplay();
      }, intervalMs);
    };
    const wireClick = (targetElement, handleClick) =>
      targetElement && targetElement.addEventListener('click', handleClick);
    const setHovered = (isHovered) => () => (carouselState.hovered = isHovered);
    wireClick(carouselElement.querySelector('[data-db-carousel-prev]'), () => goToSlide(carouselState.index - 1));
    wireClick(carouselElement.querySelector('[data-db-carousel-next]'), () => goToSlide(carouselState.index + 1));
    wireClick(pauseButton, () => {
      carouselState.stopped = !carouselState.stopped;
      pauseButton.setAttribute('aria-pressed', carouselState.stopped ? 'true' : 'false');
      pauseButton.setAttribute('aria-label', carouselState.stopped ? 'Play slides' : 'Pause slides');
    });
    wireClick(dotsElement, (clickEvent) => {
      const dotButton =
        clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('.db-carousel-dot') : null;
      if (dotButton) goToSlide(Array.prototype.indexOf.call(dotsElement.children, dotButton));
    });
    carouselElement.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') return;
      keyEvent.preventDefault();
      goToSlide(keyEvent.key === 'ArrowLeft' ? carouselState.index - 1 : carouselState.index + 1);
    });
    trackElement.addEventListener('pointerdown', (pointerEvent) => (carouselState.pointerStart = pointerEvent.clientX));
    trackElement.addEventListener('pointerup', (pointerEvent) => {
      const pointerDelta = carouselState.pointerStart === null ? 0 : pointerEvent.clientX - carouselState.pointerStart;
      carouselState.pointerStart = null;
      if (isEditing() || Math.abs(pointerDelta) < 40) return;
      goToSlide(pointerDelta > 0 ? carouselState.index - 1 : carouselState.index + 1);
    });
    trackElement.addEventListener('pointercancel', () => (carouselState.pointerStart = null));
    carouselElement.addEventListener('mouseenter', setHovered(true));
    carouselElement.addEventListener('mouseleave', setHovered(false));
    carouselElement.addEventListener('focusin', setHovered(true));
    carouselElement.addEventListener('focusout', setHovered(false));
    window.addEventListener('resize', () => scrollToCurrent('auto'));
    if (window.MutationObserver)
      new MutationObserver(scheduleAutoplay).observe(carouselElement, {
        attributes: true,
        attributeFilter: ['data-db-autoplay', 'data-db-interval'],
      });
    renderDots();
    labelSlides();
    scheduleAutoplay();
  });
};

export default runCarouselBehavior;
