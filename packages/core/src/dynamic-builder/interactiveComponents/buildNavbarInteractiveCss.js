import buildNavbarBaseCss from './buildNavbarBaseCss.js';
import buildNavbarDrawerCss from './buildNavbarDrawerCss.js';
import buildNavbarLayoutCss from './buildNavbarLayoutCss.js';
import buildNavbarScrollCss from './buildNavbarScrollCss.js';
import buildNavbarStyleCss from './buildNavbarStyleCss.js';

const buildNavbarInteractiveCss = () =>
  [
    buildNavbarBaseCss(),
    buildNavbarLayoutCss(),
    buildNavbarStyleCss(),
    buildNavbarDrawerCss(),
    buildNavbarScrollCss(),
  ].join('\n');

export default buildNavbarInteractiveCss;
