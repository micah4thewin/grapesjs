import buildTopBarButtonMarkup from './buildTopBarButtonMarkup.js';
import getOptionalTopBarButtonRecords from './getOptionalTopBarButtonRecords.js';

const buildOptionalTopBarGroupMarkup = (editor) => {
  const commandManager = editor && editor.Commands;
  if (!commandManager || !commandManager.has) return '';
  const availableRecords = getOptionalTopBarButtonRecords().filter((buttonRecord) =>
    commandManager.has(buttonRecord.commandId),
  );
  if (!availableRecords.length) return '';
  return [
    '<div class="gjs-db-panel-group gjs-db-optional-group" role="group" aria-label="Site tools">',
    availableRecords.map(buildTopBarButtonMarkup).join(''),
    '</div>',
  ].join('');
};

export default buildOptionalTopBarGroupMarkup;
