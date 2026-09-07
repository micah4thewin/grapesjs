import buildTeamMemberDefaultChildren from '../marketingComponents/buildTeamMemberDefaultChildren.js';
import getTeamMemberPresetRecords from '../marketingComponents/getTeamMemberPresetRecords.js';

const buildTeamMemberSampleRecord = (sampleIndex) => {
  const presetRecords = getTeamMemberPresetRecords();
  return {
    type: 'db-team-member',
    components: buildTeamMemberDefaultChildren(presetRecords[sampleIndex % presetRecords.length]),
  };
};

export default buildTeamMemberSampleRecord;
