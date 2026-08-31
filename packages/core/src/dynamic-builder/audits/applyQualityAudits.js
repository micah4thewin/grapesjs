import getAuditEditorCss from './getAuditEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import registerAuditCommands from './registerAuditCommands.js';

const applyQualityAudits = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.audits) || {};
  registerAuditCommands(editor, moduleOptions);
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-audits-editor', getAuditEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applyQualityAudits;
