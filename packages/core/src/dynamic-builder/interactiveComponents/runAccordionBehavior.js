const runAccordionBehavior = () => {
  document.querySelectorAll('[data-db-accordion]').forEach((accordionElement) => {
    if (accordionElement.dataset.dbAccordionReady) return;
    accordionElement.dataset.dbAccordionReady = 'true';
    const createUniqueId = (idPrefix) => idPrefix + '-' + Math.random().toString(36).slice(2, 9);
    const readTriggers = () =>
      Array.prototype.filter.call(accordionElement.querySelectorAll('[data-db-accordion-trigger]'), (triggerElement) =>
        triggerElement.closest ? triggerElement.closest('[data-db-accordion]') === accordionElement : true,
      );
    const findPanelFor = (triggerElement) => {
      const headerElement = triggerElement.closest('.db-accordion-header');
      const nextElement = headerElement && headerElement.nextElementSibling;
      return nextElement && nextElement.hasAttribute('data-db-accordion-panel') ? nextElement : null;
    };
    const wireTrigger = (triggerElement) => {
      const panelElement = findPanelFor(triggerElement);
      if (!panelElement || triggerElement.dataset.dbWired) return;
      triggerElement.dataset.dbWired = 'true';
      if (!triggerElement.id) triggerElement.id = createUniqueId('db-accordion-trigger');
      if (!panelElement.id) panelElement.id = createUniqueId('db-accordion-panel');
      triggerElement.setAttribute('aria-controls', panelElement.id);
      panelElement.setAttribute('aria-labelledby', triggerElement.id);
    };
    const setExpanded = (triggerElement, isExpanded) => {
      const panelElement = findPanelFor(triggerElement);
      triggerElement.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if (!panelElement) return;
      if (isExpanded) panelElement.removeAttribute('hidden');
      else panelElement.setAttribute('hidden', '');
    };
    const toggleTrigger = (triggerElement) => {
      const willExpand = triggerElement.getAttribute('aria-expanded') !== 'true';
      const singleMode = accordionElement.getAttribute('data-db-single') === 'true';
      if (willExpand && singleMode)
        readTriggers().forEach(
          (siblingTrigger) => siblingTrigger !== triggerElement && setExpanded(siblingTrigger, false),
        );
      setExpanded(triggerElement, willExpand);
    };
    const findOwnTrigger = (eventTarget) => {
      const triggerElement =
        eventTarget && eventTarget.closest ? eventTarget.closest('[data-db-accordion-trigger]') : null;
      return triggerElement && triggerElement.closest('[data-db-accordion]') === accordionElement
        ? triggerElement
        : null;
    };
    accordionElement.addEventListener('click', (clickEvent) => {
      const triggerElement = findOwnTrigger(clickEvent.target);
      if (!triggerElement) return;
      wireTrigger(triggerElement);
      toggleTrigger(triggerElement);
    });
    accordionElement.addEventListener('keydown', (keyEvent) => {
      const triggerElement = findOwnTrigger(keyEvent.target);
      if (!triggerElement) return;
      const triggerList = readTriggers();
      const currentIndex = triggerList.indexOf(triggerElement);
      let targetIndex = -1;
      if (keyEvent.key === 'ArrowDown') targetIndex = (currentIndex + 1) % triggerList.length;
      if (keyEvent.key === 'ArrowUp') targetIndex = (currentIndex - 1 + triggerList.length) % triggerList.length;
      if (keyEvent.key === 'Home') targetIndex = 0;
      if (keyEvent.key === 'End') targetIndex = triggerList.length - 1;
      if (targetIndex < 0 || !triggerList[targetIndex]) return;
      keyEvent.preventDefault();
      triggerList[targetIndex].focus();
    });
    readTriggers().forEach((triggerElement) => {
      wireTrigger(triggerElement);
      const itemElement = triggerElement.closest('[data-db-type=accordion-item]');
      const shouldOpen = Boolean(itemElement) && itemElement.getAttribute('data-db-open') === 'true';
      const singleMode = accordionElement.getAttribute('data-db-single') === 'true';
      const anotherOpen = readTriggers().some(
        (siblingTrigger) =>
          siblingTrigger !== triggerElement && siblingTrigger.getAttribute('aria-expanded') === 'true',
      );
      setExpanded(triggerElement, shouldOpen && !(singleMode && anotherOpen));
    });
  });
};

export default runAccordionBehavior;
