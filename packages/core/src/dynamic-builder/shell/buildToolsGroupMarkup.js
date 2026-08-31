import buildCommandGroupMarkup from './buildCommandGroupMarkup.js';
import getDbCommandLabelRecords from './getDbCommandLabelRecords.js';
import getShellToolCommandIds from './getShellToolCommandIds.js';

const buildToolsGroupMarkup = () =>
  buildCommandGroupMarkup(getShellToolCommandIds(), getDbCommandLabelRecords(), 'Tools', false);

export default buildToolsGroupMarkup;
