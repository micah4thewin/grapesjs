import buildTeamMemberDefaultChildren from './buildTeamMemberDefaultChildren.js';
import getTeamMemberPresetRecords from './getTeamMemberPresetRecords.js';

const buildTeamMemberTypeDefinition = () => ({
  type: 'db-team-member',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'team-member') && { type: 'db-team-member' },
  model: {
    defaults: {
      tagName: 'figure',
      name: 'Team member',
      draggable: true,
      droppable: false,
      classes: ['db-team-member'],
      attributes: { 'data-db-type': 'team-member' },
      components: buildTeamMemberDefaultChildren(getTeamMemberPresetRecords()[0]),
    },
  },
});

export default buildTeamMemberTypeDefinition;
