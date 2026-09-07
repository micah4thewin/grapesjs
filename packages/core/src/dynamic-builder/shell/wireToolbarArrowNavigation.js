import listToolbarStopElements from './listToolbarStopElements.js';

const wireToolbarArrowNavigation = (stripElement) => {
  const applyRovingTabindex = (activeElement) => {
    const stopElements = listToolbarStopElements(stripElement);
    if (!stopElements.length) return;
    const currentStop = stopElements.indexOf(activeElement) >= 0 ? activeElement : stopElements[0];
    stopElements.forEach((stopElement) =>
      stopElement.setAttribute('tabindex', stopElement === currentStop ? '0' : '-1'),
    );
  };
  stripElement.addEventListener('keydown', (keyEvent) => {
    const targetElement = keyEvent.target;
    if (!targetElement || !targetElement.closest || targetElement.closest('[data-db-menu]')) return;
    const navigationKeys = { ArrowRight: 1, ArrowLeft: -1, Home: 0, End: 0 };
    if (!(keyEvent.key in navigationKeys) || keyEvent.altKey || keyEvent.ctrlKey || keyEvent.metaKey) return;
    const stopElements = listToolbarStopElements(stripElement);
    const currentIndex = stopElements.indexOf(targetElement);
    if (currentIndex < 0) return;
    let nextIndex = currentIndex + navigationKeys[keyEvent.key];
    if (keyEvent.key === 'Home') nextIndex = 0;
    if (keyEvent.key === 'End') nextIndex = stopElements.length - 1;
    nextIndex = (nextIndex + stopElements.length) % stopElements.length;
    keyEvent.preventDefault();
    stopElements[nextIndex].focus();
    applyRovingTabindex(stopElements[nextIndex]);
  });
  stripElement.addEventListener('focusin', (focusEvent) => {
    const targetElement = focusEvent.target;
    if (!targetElement || !targetElement.closest || targetElement.closest('[data-db-menu]')) return;
    applyRovingTabindex(targetElement);
  });
  applyRovingTabindex(null);
};

export default wireToolbarArrowNavigation;
