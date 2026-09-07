import buildBrandGroupMarkup from './buildBrandGroupMarkup.js';
import buildDeviceGroupMarkup from './buildDeviceGroupMarkup.js';
import buildDeviceMenuMarkup from './buildDeviceMenuMarkup.js';
import buildExtraTopBarGroupMarkup from './buildExtraTopBarGroupMarkup.js';
import buildHistoryGroupMarkup from './buildHistoryGroupMarkup.js';
import buildOptionalTopBarGroupMarkup from './buildOptionalTopBarGroupMarkup.js';
import buildPagesMenuMarkup from './buildPagesMenuMarkup.js';
import buildPreviewExitMarkup from './buildPreviewExitMarkup.js';
import buildStatusGroupMarkup from './buildStatusGroupMarkup.js';
import buildToolsMenuMarkup from './buildToolsMenuMarkup.js';
import buildViewGroupMarkup from './buildViewGroupMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import resolveBrandLabelText from './resolveBrandLabelText.js';

const buildTopBarMarkup = (editor, shellOptions, experienceOptions) => {
  const brandLabelText = resolveBrandLabelText(shellOptions);
  const toolbarLabel = brandLabelText ? `${brandLabelText} toolbar` : 'Editor toolbar';
  return [
    '<div class="gjs-db-panel-top" data-db-panel="db-top" role="toolbar" data-db-compact="0"',
    ` aria-label="${escapeHtmlText(toolbarLabel)}">`,
    buildBrandGroupMarkup(brandLabelText),
    buildOptionalTopBarGroupMarkup(editor),
    buildPagesMenuMarkup(editor),
    buildExtraTopBarGroupMarkup(shellOptions, 'start'),
    buildDeviceGroupMarkup(editor),
    buildDeviceMenuMarkup(editor),
    buildViewGroupMarkup(),
    buildHistoryGroupMarkup(),
    buildToolsMenuMarkup(editor),
    buildPreviewExitMarkup(),
    buildExtraTopBarGroupMarkup(shellOptions, 'end'),
    buildStatusGroupMarkup(experienceOptions),
    '</div>',
  ].join('');
};

export default buildTopBarMarkup;
