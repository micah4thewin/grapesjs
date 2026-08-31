import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';
import buildSocialLinksRowComponent from './buildSocialLinksRowComponent.js';

const buildTeamMemberDefaultChildren = () => [
  {
    type: 'db-image',
    classes: ['db-image', 'db-team-avatar'],
    attributes: {
      src: buildMarketingPlaceholderUri('avatar'),
      alt: 'Portrait of Jordan Avery',
      loading: 'lazy',
      decoding: 'async',
      width: '240',
      height: '240',
    },
  },
  {
    tagName: 'figcaption',
    name: 'Member details',
    classes: ['db-team-caption'],
    components: [
      { tagName: 'h3', type: 'text', name: 'Member name', classes: ['db-team-name'], components: 'Jordan Avery' },
      {
        tagName: 'p',
        type: 'text',
        name: 'Member role',
        classes: ['db-team-role'],
        components: 'Principal Product Designer',
      },
      buildSocialLinksRowComponent(),
    ],
  },
];

export default buildTeamMemberDefaultChildren;
