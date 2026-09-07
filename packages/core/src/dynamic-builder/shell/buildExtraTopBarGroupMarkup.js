import buildTopBarButtonMarkup from './buildTopBarButtonMarkup.js';

const buildExtraTopBarGroupMarkup = (shellOptions, placementName) => {
  const buttonRecords = Array.isArray(shellOptions.topBarButtons) ? shellOptions.topBarButtons : [];
  const placedRecords = buttonRecords.filter(
    (buttonRecord) => buttonRecord && (buttonRecord.placement || 'start') === placementName && buttonRecord.commandId,
  );
  const buttonsMarkup = placedRecords.map(buildTopBarButtonMarkup).join('');
  const hiddenText = buttonsMarkup ? '' : ' hidden';
  return [
    `<div class="gjs-db-panel-group gjs-db-extra-group" data-db-top-bar-extras="${placementName}" role="group"`,
    ` aria-label="More tools"${hiddenText}>${buttonsMarkup}</div>`,
  ].join('');
};

export default buildExtraTopBarGroupMarkup;
