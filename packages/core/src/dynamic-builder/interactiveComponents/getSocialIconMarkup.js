import getIconMarkup from '../support/getIconMarkup.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const getSocialIconMarkup = (networkName) =>
  getIconMarkup(resolveSocialNetworkRecord(networkName).iconName, { size: 20 });

export default getSocialIconMarkup;
