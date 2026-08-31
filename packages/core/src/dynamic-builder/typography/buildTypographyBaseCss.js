import buildBaseBodyTypographyCss from './buildBaseBodyTypographyCss.js';
import buildHeadingScaleCss from './buildHeadingScaleCss.js';
import buildInlineTextElementCss from './buildInlineTextElementCss.js';
import buildProseCss from './buildProseCss.js';
import buildTextUtilityCss from './buildTextUtilityCss.js';
import buildTextVariantCss from './buildTextVariantCss.js';
import buildTrackingUtilityCss from './buildTrackingUtilityCss.js';

const buildTypographyBaseCss = () =>
  [
    buildBaseBodyTypographyCss(),
    buildHeadingScaleCss(),
    buildTextVariantCss(),
    buildProseCss(),
    buildInlineTextElementCss(),
    buildTrackingUtilityCss(),
    buildTextUtilityCss(),
  ].join('\n');

export default buildTypographyBaseCss;
