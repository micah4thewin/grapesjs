import getIconPickerEditorCss from './getIconPickerEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import registerIconAssetGuard from './registerIconAssetGuard.js';
import registerIconCanvasStyles from './registerIconCanvasStyles.js';
import registerIconComponentType from './registerIconComponentType.js';
import registerIconUpdateListener from './registerIconUpdateListener.js';
import wireIconToolbarPickerButton from './wireIconToolbarPickerButton.js';

const applyIconSystem = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.icons) || {};
  registerIconComponentType(editor, moduleOptions);
  registerIconUpdateListener(editor);
  registerIconAssetGuard(editor);
  registerIconCanvasStyles(editor);
  wireIconToolbarPickerButton(editor);
  const injectIconPickerStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-icon-picker', getIconPickerEditorCss());
  };
  injectIconPickerStyles();
  if (editor.onReady) editor.onReady(() => injectIconPickerStyles());
};

export default applyIconSystem;
