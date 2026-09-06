import getActionIconPaths from './getActionIconPaths.js';
import getBusinessIconPaths from './getBusinessIconPaths.js';
import getCommerceIconPaths from './getCommerceIconPaths.js';
import getCommunicationIconPaths from './getCommunicationIconPaths.js';
import getContentIconPaths from './getContentIconPaths.js';
import getDeviceIconPaths from './getDeviceIconPaths.js';
import getDirectionIconPaths from './getDirectionIconPaths.js';
import getEducationIconPaths from './getEducationIconPaths.js';
import getFoodIconPaths from './getFoodIconPaths.js';
import getHealthIconPaths from './getHealthIconPaths.js';
import getInterfaceIconPaths from './getInterfaceIconPaths.js';
import getMediaLibraryIconPaths from './getMediaLibraryIconPaths.js';
import getNatureIconPaths from './getNatureIconPaths.js';
import getShapeIconPaths from './getShapeIconPaths.js';
import getSocialIconPaths from './getSocialIconPaths.js';
import getSystemIconPaths from './getSystemIconPaths.js';
import getToolIconPaths from './getToolIconPaths.js';
import getTravelIconPaths from './getTravelIconPaths.js';

const getIconPathLibrary = () => ({
  ...getInterfaceIconPaths(),
  ...getActionIconPaths(),
  ...getContentIconPaths(),
  ...getSystemIconPaths(),
  ...getDirectionIconPaths(),
  ...getShapeIconPaths(),
  ...getCommunicationIconPaths(),
  ...getBusinessIconPaths(),
  ...getCommerceIconPaths(),
  ...getMediaLibraryIconPaths(),
  ...getDeviceIconPaths(),
  ...getToolIconPaths(),
  ...getEducationIconPaths(),
  ...getHealthIconPaths(),
  ...getFoodIconPaths(),
  ...getNatureIconPaths(),
  ...getTravelIconPaths(),
  ...getSocialIconPaths(),
});

export default getIconPathLibrary;
