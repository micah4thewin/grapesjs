import buildFormControlCss from './buildFormControlCss.js';
import buildFormFeedbackCss from './buildFormFeedbackCss.js';
import buildFormLayoutCss from './buildFormLayoutCss.js';

const buildFormsBaseCss = () =>
  [buildFormLayoutCss(), buildFormControlCss(), buildFormFeedbackCss()].map((cssText) => cssText.trim()).join('\n');

export default buildFormsBaseCss;
