import findComponentsByClassName from './findComponentsByClassName.js';

const syncAccordionHeadingLevel = (accordionComponent) => {
  if (!accordionComponent || typeof accordionComponent.getAttributes !== 'function') return 0;
  const levelValue = String((accordionComponent.getAttributes() || {})['data-db-heading-level'] || '3').trim();
  if (!/^[2-6]$/.test(levelValue)) return 0;
  const nextTagName = 'h' + levelValue;
  let changedCount = 0;
  findComponentsByClassName(accordionComponent, 'db-accordion-header').forEach((headerComponent) => {
    if (headerComponent.get('tagName') === nextTagName) return;
    headerComponent.set({ tagName: nextTagName });
    changedCount += 1;
  });
  return changedCount;
};

export default syncAccordionHeadingLevel;
