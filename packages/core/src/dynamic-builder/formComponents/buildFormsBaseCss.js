import buildFormControlCss from './buildFormControlCss.js';
import buildFormFeedbackCss from './buildFormFeedbackCss.js';
import buildFormLayoutCss from './buildFormLayoutCss.js';
import buildFormStepsCss from './buildFormStepsCss.js';

const buildFormsBaseCss = () =>
  [buildFormLayoutCss(), buildFormControlCss(), buildFormFeedbackCss(), buildFormStepsCss()]
    .map((cssText) => cssText.trim())
    .join('\n');

export default buildFormsBaseCss;
