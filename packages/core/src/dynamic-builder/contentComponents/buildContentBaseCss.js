import buildButtonContentCss from './buildButtonContentCss.js';
import buildButtonGroupContentCss from './buildButtonGroupContentCss.js';
import buildButtonVariantCss from './buildButtonVariantCss.js';
import buildCalloutContentCss from './buildCalloutContentCss.js';
import buildHeadingContentCss from './buildHeadingContentCss.js';
import buildListContentCss from './buildListContentCss.js';
import buildQuoteContentCss from './buildQuoteContentCss.js';
import buildTextContentCss from './buildTextContentCss.js';

const buildContentBaseCss = () =>
  [
    buildHeadingContentCss(),
    buildTextContentCss(),
    buildQuoteContentCss(),
    buildCalloutContentCss(),
    buildButtonContentCss(),
    buildButtonVariantCss(),
    buildButtonGroupContentCss(),
    buildListContentCss(),
  ].join('\n');

export default buildContentBaseCss;
