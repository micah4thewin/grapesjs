import createSvgIconMarkup from '../support/createSvgIconMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const xLogoPaths = '<path d="M4 4h4.2l11.8 16H15.8z"/><path d="M20 4l-6.6 7.6M4 20l6.6-7.6"/>';

const getSocialIconMarkup = (networkName) => {
  const networkRecord = resolveSocialNetworkRecord(networkName);
  if (networkRecord.networkName === 'x') return createSvgIconMarkup(xLogoPaths, { size: 20 });
  return getIconMarkup(networkRecord.iconName, { size: 20 });
};

export default getSocialIconMarkup;
