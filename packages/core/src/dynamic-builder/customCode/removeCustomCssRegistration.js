import buildCustomCodeStyleId from './buildCustomCodeStyleId.js';
import getCanvasCssRegistry from '../support/getCanvasCssRegistry.js';

const removeCustomCssRegistration = (editor, component) => {
  if (!component || !component.getId) return;
  const styleId = buildCustomCodeStyleId(component);
  getCanvasCssRegistry(editor).delete(styleId);
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument) return;
  const styleElement = canvasDocument.getElementById(styleId);
  if (styleElement && styleElement.remove) styleElement.remove();
};

export default removeCustomCssRegistration;
