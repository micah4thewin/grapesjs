import getActionIconPaths from '../support/getActionIconPaths.js';
import getBusinessIconPaths from '../support/getBusinessIconPaths.js';
import getCommerceIconPaths from '../support/getCommerceIconPaths.js';
import getCommunicationIconPaths from '../support/getCommunicationIconPaths.js';
import getContentIconPaths from '../support/getContentIconPaths.js';
import getDeviceIconPaths from '../support/getDeviceIconPaths.js';
import getDirectionIconPaths from '../support/getDirectionIconPaths.js';
import getEducationIconPaths from '../support/getEducationIconPaths.js';
import getFoodIconPaths from '../support/getFoodIconPaths.js';
import getHealthIconPaths from '../support/getHealthIconPaths.js';
import getInterfaceIconPaths from '../support/getInterfaceIconPaths.js';
import getMediaLibraryIconPaths from '../support/getMediaLibraryIconPaths.js';
import getNatureIconPaths from '../support/getNatureIconPaths.js';
import getShapeIconPaths from '../support/getShapeIconPaths.js';
import getSocialIconPaths from '../support/getSocialIconPaths.js';
import getSystemIconPaths from '../support/getSystemIconPaths.js';
import getToolIconPaths from '../support/getToolIconPaths.js';
import getTravelIconPaths from '../support/getTravelIconPaths.js';

const categorySourceRecords = [
  ['popular', 'Popular', getInterfaceIconPaths],
  ['arrows', 'Arrows', getDirectionIconPaths],
  ['shapes', 'Shapes', getShapeIconPaths],
  ['actions', 'Actions', getActionIconPaths],
  ['communication', 'Communication', getCommunicationIconPaths],
  ['social', 'Social', getSocialIconPaths],
  ['business', 'Business', getBusinessIconPaths],
  ['commerce', 'Shopping', getCommerceIconPaths],
  ['media', 'Media', getMediaLibraryIconPaths],
  ['content', 'Content', getContentIconPaths],
  ['devices', 'Devices', getDeviceIconPaths],
  ['tools', 'Tools', getToolIconPaths],
  ['education', 'Education', getEducationIconPaths],
  ['health', 'Health', getHealthIconPaths],
  ['food', 'Food', getFoodIconPaths],
  ['nature', 'Nature', getNatureIconPaths],
  ['travel', 'Travel', getTravelIconPaths],
  ['system', 'Editor', getSystemIconPaths],
];

const getIconCategoryRecords = () =>
  categorySourceRecords.map(([categoryId, categoryLabel, readIconPaths]) => ({
    categoryId,
    categoryLabel,
    iconNames: Object.keys(readIconPaths()).sort((firstName, secondName) => firstName.localeCompare(secondName)),
  }));

export default getIconCategoryRecords;
