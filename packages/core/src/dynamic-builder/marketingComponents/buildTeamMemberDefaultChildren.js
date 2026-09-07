import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';
import buildMarketingSocialLinksRecord from './buildMarketingSocialLinksRecord.js';
import getTeamMemberPresetRecords from './getTeamMemberPresetRecords.js';

const buildTeamMemberDefaultChildren = (presetRecord) => {
  const safePreset = presetRecord || getTeamMemberPresetRecords()[0];
  return [
  {
    type: 'db-image',
    classes: ['db-image', 'db-team-avatar'],
    attributes: {
      src: buildMarketingPlaceholderUri('avatar'),
      alt: 'Portrait of ' + safePreset.name,
      loading: 'lazy',
      decoding: 'async',
      width: '240',
      height: '240',
      'data-db-field': 'portrait',
    },
  },
  {
    tagName: 'figcaption',
    name: 'Member details',
    classes: ['db-team-caption'],
    components: [
      {
        tagName: 'h3',
        type: 'text',
        name: 'Member name',
        classes: ['db-team-name'],
        attributes: { 'data-db-field': 'name' },
        components: safePreset.name,
      },
      {
        tagName: 'p',
        type: 'text',
        name: 'Member role',
        classes: ['db-team-role'],
        attributes: { 'data-db-field': 'role' },
        components: safePreset.role,
      },
      buildMarketingSocialLinksRecord(['linkedin', 'x', 'email']),
    ],
  },
];
};

export default buildTeamMemberDefaultChildren;
