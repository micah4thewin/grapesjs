import buildCustomCodeStyleId from './buildCustomCodeStyleId.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import removeCustomCssRegistration from './removeCustomCssRegistration.js';
import sanitizeCssCode from './sanitizeCssCode.js';

const applyCustomCssRegistration = (editor, component) => {
  if (!component || !component.getAttributes || !component.getId) return;
  const safeCssCode = sanitizeCssCode(component.getAttributes().cssCode);
  if (!safeCssCode.trim()) {
    removeCustomCssRegistration(editor, component);
    return;
  }
  registerCanvasStyles(editor, buildCustomCodeStyleId(component), safeCssCode);
};

export default applyCustomCssRegistration;
