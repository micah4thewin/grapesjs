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
  wireDeviceSegment(editor, workspaceElement);
  wireZoomControls(editor, workspaceElement);
  wireStagePreviewToggle(editor, workspaceElement);
  const requestedTool = workspaceOptions.defaultTool;
  const startTool = requestedTool === 'layers' || requestedTool === 'pages' ? requestedTool : 'blocks';
  activateWorkspaceTool(editor, workspaceElement, startTool);
  wireWorkspaceSize(editor, workspaceElement);
  wireInspectorToggle(editor, workspaceElement);
};

export default wireWorkspaceShell;
