import buildProseCss from './buildProseCss.js';
import buildTextUtilityCss from './buildTextUtilityCss.js';
import buildTrackingUtilityCss from './buildTrackingUtilityCss.js';

const buildTypographyUtilityCss = () => [buildProseCss(), buildTrackingUtilityCss(), buildTextUtilityCss()].join('\n');

export default buildTypographyUtilityCss;
