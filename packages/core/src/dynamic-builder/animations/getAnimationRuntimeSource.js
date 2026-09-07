import getAnimationObserverSource from './getAnimationObserverSource.js';
import getAnimationRevealSource from './getAnimationRevealSource.js';
import getAnimationStaggerSource from './getAnimationStaggerSource.js';

const getAnimationRuntimeSource = () =>
  [
    'var rootElement = document.documentElement;',
    "var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;",
    'if (reduceMotion) return;',
    ...getAnimationStaggerSource(),
    "[].slice.call(document.querySelectorAll('[data-db-aos-stagger]')).forEach(expandStaggerParent);",
    "rootElement.setAttribute('data-db-aos-ready', 'true');",
    "var animatedElements = [].slice.call(document.querySelectorAll('[data-db-aos]')).filter(function (element) {",
    "  return element.getAttribute('data-db-aos-in') !== 'true';",
    '});',
    'if (!animatedElements.length) return;',
    ...getAnimationRevealSource(),
    'animatedElements.forEach(applyTiming);',
    "if (typeof IntersectionObserver !== 'function') {",
    '  animatedElements.forEach(reveal);',
    '  return;',
    '}',
    ...getAnimationObserverSource(),
  ].join('\n');

export default getAnimationRuntimeSource;
