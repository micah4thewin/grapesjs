import buildBrandGroupMarkup from './buildBrandGroupMarkup.js';
import buildDeviceGroupMarkup from './buildDeviceGroupMarkup.js';
import buildHistoryGroupMarkup from './buildHistoryGroupMarkup.js';
import buildPagesMenuMarkup from './buildPagesMenuMarkup.js';
import buildStatusGroupMarkup from './buildStatusGroupMarkup.js';
import buildToolsMenuMarkup from './buildToolsMenuMarkup.js';
import buildViewGroupMarkup from './buildViewGroupMarkup.js';

const buildTopBarMarkup = (editor, shellOptions) =>
  [
    '<div id="db-top" class="gjs-db-panel-top" data-db-panel="db-top" role="toolbar"',
    ' aria-label="Dynamic Builder toolbar">',
    buildBrandGroupMarkup(shellOptions.brandLabel || 'Dynamic Builder'),
    buildPagesMenuMarkup(editor),
    buildDeviceGroupMarkup(editor),
    buildViewGroupMarkup(),
    buildHistoryGroupMarkup(),
    buildToolsMenuMarkup(),
    buildStatusGroupMarkup(),
    '</div>',
  ].join('');

export default buildTopBarMarkup;
