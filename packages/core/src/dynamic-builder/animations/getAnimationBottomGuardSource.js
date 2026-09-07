const getAnimationBottomGuardSource = () => [
  'var revealTrailingElements = function () {',
  '  var scrolledBottom = window.innerHeight + window.pageYOffset;',
  '  var documentHeight = document.documentElement.scrollHeight;',
  '  if (scrolledBottom < documentHeight - 2) return;',
  '  animatedElements.forEach(function (element) {',
  "    if (element.getAttribute('data-db-aos') === 'none') return;",
  "    if (element.getAttribute('data-db-aos-in') === 'true') return;",
  '    if (element.getBoundingClientRect().top > window.innerHeight) return;',
  '    reveal(element);',
  '  });',
  '};',
  "window.addEventListener('scroll', revealTrailingElements, { passive: true });",
  "window.addEventListener('resize', revealTrailingElements);",
  'setTimeout(revealTrailingElements, 400);',
];

export default getAnimationBottomGuardSource;
