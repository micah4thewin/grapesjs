import buildNavbarBaseCss from './buildNavbarBaseCss.js';
import buildNavbarDrawerCss from './buildNavbarDrawerCss.js';
import buildNavbarLayoutCss from './buildNavbarLayoutCss.js';

const buildNavbarInteractiveCss = () =>
  [buildNavbarBaseCss(), buildNavbarLayoutCss(), buildNavbarDrawerCss()].join('\n');

export default buildNavbarInteractiveCss;
