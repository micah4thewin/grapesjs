import getSocialIconMarkup from './getSocialIconMarkup.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const buildSocialLinkItemMarkup = (networkName) => {
  const networkRecord = resolveSocialNetworkRecord(networkName);
  return [
    '<li>',
    `<a class="db-social-link" href="${networkRecord.profileUrl}" rel="noopener"`,
    ` aria-label="${networkRecord.networkLabel}" data-db-network="${networkRecord.networkName}">`,
    getSocialIconMarkup(networkRecord.networkName),
    '</a>',
    '</li>',
  ].join('');
};

export default buildSocialLinkItemMarkup;
