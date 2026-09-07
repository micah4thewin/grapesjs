import getWorkspaceDockCss from './getWorkspaceDockCss.js';
import getWorkspaceFrameCss from './getWorkspaceFrameCss.js';
import getWorkspaceInspectorCss from './getWorkspaceInspectorCss.js';
import getWorkspacePagesCss from './getWorkspacePagesCss.js';
import getWorkspaceRailCss from './getWorkspaceRailCss.js';
import getWorkspaceResponsiveCss from './getWorkspaceResponsiveCss.js';
import getWorkspaceStageCss from './getWorkspaceStageCss.js';

const composeWorkspaceCss = () =>
  [
    getWorkspaceFrameCss,
    getWorkspaceRailCss,
    getWorkspaceDockCss,
    getWorkspaceStageCss,
    getWorkspaceInspectorCss,
    getWorkspacePagesCss,
    getWorkspaceResponsiveCss,
  ]
    .map((buildSectionCss) => buildSectionCss().trim())
    .join('\n');

export default composeWorkspaceCss;
