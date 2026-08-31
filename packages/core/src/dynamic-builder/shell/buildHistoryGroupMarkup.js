import buildCommandGroupMarkup from './buildCommandGroupMarkup.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';

const buildHistoryGroupMarkup = () =>
  buildCommandGroupMarkup(['core:undo', 'core:redo'], getCoreCommandLabelRecords(), 'History', false);

export default buildHistoryGroupMarkup;
