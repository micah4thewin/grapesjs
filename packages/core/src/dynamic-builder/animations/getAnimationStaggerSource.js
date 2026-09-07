const getAnimationStaggerSource = () => [
  "var copiedKeys = ['data-db-aos', 'data-db-aos-duration', 'data-db-aos-easing', 'data-db-aos-offset', 'data-db-aos-once'];",
  'var expandStaggerParent = function (parentElement) {',
  "  var staggerStep = parseInt(parentElement.getAttribute('data-db-aos-stagger') || '0', 10);",
  "  if (!(staggerStep > 0) || parentElement.getAttribute('data-db-aos') === 'none') return;",
  "  var baseDelay = parseInt(parentElement.getAttribute('data-db-aos-delay') || '0', 10) || 0;",
  "  parentElement.setAttribute('data-db-aos-in', 'true');",
  '  [].slice.call(parentElement.children).forEach(function (childElement, childIndex) {',
  "    if (childElement.hasAttribute('data-db-aos') && !childElement.hasAttribute('data-db-aos-generated')) return;",
  '    copiedKeys.forEach(function (attributeName) {',
  '      var parentValue = parentElement.getAttribute(attributeName);',
  '      if (parentValue !== null) childElement.setAttribute(attributeName, parentValue);',
  '    });',
  "    childElement.setAttribute('data-db-aos-delay', String(baseDelay + childIndex * staggerStep));",
  "    childElement.setAttribute('data-db-aos-generated', 'true');",
  '  });',
  '};',
];

export default getAnimationStaggerSource;
