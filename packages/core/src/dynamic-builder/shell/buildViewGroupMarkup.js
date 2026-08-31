import buildCommandGroupMarkup from './buildCommandGroupMarkup.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';
import getViewToggleCommandIds from './getViewToggleCommandIds.js';

const buildViewGroupMarkup = () =>
  buildCommandGroupMarkup(getViewToggleCommandIds(), getCoreCommandLabelRecords(), 'View', true);

export default buildViewGroupMarkup;
