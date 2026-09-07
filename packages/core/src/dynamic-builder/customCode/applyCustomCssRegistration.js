import boostCssSpecificity from './boostCssSpecificity.js';
import buildCustomCodeStyleId from './buildCustomCodeStyleId.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import removeCustomCssRegistration from './removeCustomCssRegistration.js';
import sanitizeCssCode from './sanitizeCssCode.js';

const applyCustomCssRegistration = (editor, component) => {
  if (!component || !component.getAttributes || !component.getId) return;
  const attributesRecord = component.getAttributes();
  const safeCssCode = sanitizeCssCode(attributesRecord.cssCode);
  if (!safeCssCode.trim()) {
    removeCustomCssRegistration(editor, component);
    return;
  }
  const keepAsWritten = String(attributesRecord.cssPriority || 'boost') === 'as-written';
  registerCanvasStyles(editor, buildCustomCodeStyleId(component), keepAsWritten ? safeCssCode : boostCssSpecificity(safeCssCode));
};

export default applyCustomCssRegistration;
