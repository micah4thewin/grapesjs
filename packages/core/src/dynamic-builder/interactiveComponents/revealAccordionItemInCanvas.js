const setItemExpanded = (itemElement, isExpanded) => {
  const triggerElement = itemElement.querySelector('[data-db-accordion-trigger]');
  const panelElement = itemElement.querySelector('[data-db-accordion-panel]');
  if (triggerElement) triggerElement.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  if (!panelElement) return;
  if (isExpanded) panelElement.removeAttribute('hidden');
  else panelElement.setAttribute('hidden', '');
};

const revealAccordionItemInCanvas = (targetElement) => {
  let revealedCount = 0;
  let cursorElement = targetElement && targetElement.closest ? targetElement : null;
  while (cursorElement) {
    const itemElement = cursorElement.closest('[data-db-type="accordion-item"]');
    if (!itemElement) break;
    const accordionElement = itemElement.closest('[data-db-accordion]');
    if (accordionElement && accordionElement.getAttribute('data-db-single') === 'true') {
      Array.prototype.forEach.call(accordionElement.children, (siblingElement) => {
        if (siblingElement !== itemElement && siblingElement.hasAttribute('data-db-accordion-trigger') === false) {
          if (siblingElement.getAttribute('data-db-type') === 'accordion-item') setItemExpanded(siblingElement, false);
        }
      });
    }
    setItemExpanded(itemElement, true);
    revealedCount += 1;
    cursorElement = itemElement.parentElement;
  }
  return revealedCount;
};

export default revealAccordionItemInCanvas;
