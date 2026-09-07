import buildDockMarkup from './buildDockMarkup.js';
import buildInspectorMarkup from './buildInspectorMarkup.js';
import buildRailMarkup from './buildRailMarkup.js';
import buildStageBarMarkup from './buildStageBarMarkup.js';

const buildWorkspaceMarkup = (editor) =>
  [
    '<div class="gjs-db-ws" data-db-workspace data-db-size="lg" data-db-dock-open="1"',
    ' data-db-inspector-open="1" data-db-preview="0">',
    buildRailMarkup(),
    buildDockMarkup(),
    '<main class="gjs-db-ws-stage" data-db-stage>',
    buildStageBarMarkup(editor),
    '<div class="gjs-db-stage-canvas" data-db-stage-canvas></div>',
    '</main>',
    buildInspectorMarkup(),
    '</div>',
  ].join('');

export default buildWorkspaceMarkup;
