import getSocialIconMarkup from './getSocialIconMarkup.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const buildSocialLinkChild = (networkName) => {
  const networkRecord = resolveSocialNetworkRecord(networkName);
  return {
    tagName: 'li',
    name: networkRecord.networkLabel + ' profile',
    draggable: '[data-db-type=social-links]',
    droppable: false,
    copyable: false,
    components: [
      {
        type: 'link',
        name: networkRecord.networkLabel + ' link',
        droppable: false,
        draggable: false,
        copyable: false,
        removable: false,
        classes: ['db-social-link'],
        attributes: {
          'aria-label': networkRecord.networkLabel,
          'data-db-network': networkRecord.networkName,
          rel: 'noopener',
        },
        components: getSocialIconMarkup(networkRecord.networkName),
        traits: [
          { type: 'db-url', name: 'href', label: 'Profile URL', placeholder: networkRecord.urlPlaceholder },
          { type: 'db-aria-label', name: 'aria-label', label: 'ARIA label' },
        ],
      },
    ],
  };
};

export default buildSocialLinkChild;
