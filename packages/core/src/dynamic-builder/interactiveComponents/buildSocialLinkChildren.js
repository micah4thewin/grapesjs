import getSocialIconMarkup from './getSocialIconMarkup.js';

const buildSocialLinkChildren = () => {
  const socialNetworkRecords = [
    { networkName: 'x', networkLabel: 'X (formerly Twitter)', profileUrl: 'https://x.com/' },
    { networkName: 'facebook', networkLabel: 'Facebook', profileUrl: 'https://facebook.com/' },
    { networkName: 'instagram', networkLabel: 'Instagram', profileUrl: 'https://instagram.com/' },
    { networkName: 'linkedin', networkLabel: 'LinkedIn', profileUrl: 'https://linkedin.com/' },
    { networkName: 'youtube', networkLabel: 'YouTube', profileUrl: 'https://youtube.com/' },
    { networkName: 'github', networkLabel: 'GitHub', profileUrl: 'https://github.com/' },
  ];
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
