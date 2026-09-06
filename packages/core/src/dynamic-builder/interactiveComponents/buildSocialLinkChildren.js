import getSocialIconMarkup from './getSocialIconMarkup.js';
import getSocialNetworkRecords from './getSocialNetworkRecords.js';

const buildSocialLinkChildren = () => {
  const defaultNetworkNames = ['x', 'facebook', 'instagram', 'linkedin', 'youtube', 'github'];
  const socialNetworkRecords = getSocialNetworkRecords().filter(
    (networkRecord) => defaultNetworkNames.indexOf(networkRecord.networkName) >= 0,
  );
  return socialNetworkRecords.map((networkRecord) => ({
    tagName: 'li',
    draggable: '[data-db-type=social-links]',
    droppable: false,
    components: [
      {
        type: 'link',
        name: networkRecord.networkLabel + ' link',
        droppable: false,
        classes: ['db-social-link'],
        attributes: {
          href: networkRecord.profileUrl,
          'aria-label': networkRecord.networkLabel,
          'data-db-network': networkRecord.networkName,
          rel: 'noopener',
        },
        components: getSocialIconMarkup(networkRecord.networkName),
        traits: [
          { type: 'db-url', name: 'href', label: 'Profile URL' },
          { type: 'db-aria-label', name: 'aria-label', label: 'ARIA label' },
        ],
      },
    ],
  }));
};

export default buildSocialLinkChildren;
