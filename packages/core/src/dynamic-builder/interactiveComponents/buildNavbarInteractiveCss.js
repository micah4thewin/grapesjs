import buildNavbarBaseCss from './buildNavbarBaseCss.js';
import buildNavbarDrawerCss from './buildNavbarDrawerCss.js';
import buildNavbarLayoutCss from './buildNavbarLayoutCss.js';
import buildNavbarScrollCss from './buildNavbarScrollCss.js';

const buildNavbarInteractiveCss = () =>
  [buildNavbarBaseCss(), buildNavbarLayoutCss(), buildNavbarDrawerCss(), buildNavbarScrollCss()].join('\n');

export default buildNavbarInteractiveCss;
