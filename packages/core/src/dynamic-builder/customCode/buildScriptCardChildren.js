import buildCodeCardChildren from './buildCodeCardChildren.js';
import getCodePreviewLine from './getCodePreviewLine.js';

const buildScriptCardChildren = (scriptCode) =>
  buildCodeCardChildren({
    iconName: 'code',
    titleText: 'Custom script',
    previewText: getCodePreviewLine(scriptCode, 'No script code yet'),
    noteText: 'Inert in the editor. Runs only in exported sites when scripts are allowed in Custom code settings.',
  });

export default buildScriptCardChildren;
