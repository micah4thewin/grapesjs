import activateWorkspaceTool from './activateWorkspaceTool.js';
import wireDeviceSegment from './wireDeviceSegment.js';
import wireInspectorGroups from './wireInspectorGroups.js';
import wireInspectorSelection from './wireInspectorSelection.js';
import wireInspectorToggle from './wireInspectorToggle.js';
import wirePagesPane from './wirePagesPane.js';
import wireRailTools from './wireRailTools.js';
import wireStagePreviewToggle from './wireStagePreviewToggle.js';
import wireWorkspaceSize from './wireWorkspaceSize.js';
import wireZoomControls from './wireZoomControls.js';

const wireWorkspaceShell = (editor, workspaceElement, pluginOptions, workspaceOptions) => {
  wireRailTools(editor, workspaceElement);
  wirePagesPane(editor, workspaceElement);
  wireInspectorGroups(editor, workspaceElement, pluginOptions);
  wireInspectorSelection(editor, workspaceElement);
  wireInspectorToggle(editor, workspaceElement);
  wireDeviceSegment(editor, workspaceElement);
  wireZoomControls(editor, workspaceElement);
  wireStagePreviewToggle(editor, workspaceElement);
  wireWorkspaceSize(editor, workspaceElement);
  const startTool = workspaceOptions.defaultTool === 'layers' || workspaceOptions.defaultTool === 'pages';
  activateWorkspaceTool(editor, workspaceElement, startTool ? workspaceOptions.defaultTool : 'blocks');
};

export default wireWorkspaceShell;
