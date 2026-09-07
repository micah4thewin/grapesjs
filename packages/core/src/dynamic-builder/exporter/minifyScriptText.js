import collapseScriptWhitespace from './collapseScriptWhitespace.js';
import stripScriptComments from './stripScriptComments.js';

const minifyScriptText = (scriptText) =>
  collapseScriptWhitespace(stripScriptComments(String(scriptText == null ? '' : scriptText)));

export default minifyScriptText;
