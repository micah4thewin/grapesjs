import getActionIconPaths from './getActionIconPaths.js';
import getContentIconPaths from './getContentIconPaths.js';
import getInteractionIconPaths from './getInteractionIconPaths.js';
import getInterfaceIconPaths from './getInterfaceIconPaths.js';
import getSystemIconPaths from './getSystemIconPaths.js';

const getIconPathLibrary = () => ({
  ...getInterfaceIconPaths(),
  ...getActionIconPaths(),
  ...getContentIconPaths(),
  ...getSystemIconPaths(),
  ...getInteractionIconPaths(),
});

export default getIconPathLibrary;
