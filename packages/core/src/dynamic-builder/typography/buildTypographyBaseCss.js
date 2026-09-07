import buildBaseBodyTypographyCss from './buildBaseBodyTypographyCss.js';
import buildHeadingScaleCss from './buildHeadingScaleCss.js';
import buildInlineTextElementCss from './buildInlineTextElementCss.js';

const buildTypographyBaseCss = () =>
  [buildBaseBodyTypographyCss(), buildHeadingScaleCss(), buildInlineTextElementCss()].join('\n');

export default buildTypographyBaseCss;
