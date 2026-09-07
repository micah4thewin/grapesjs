import buildTeamMemberDefaultChildren from '../marketingComponents/buildTeamMemberDefaultChildren.js';
import getSamplePeopleRecords from './getSamplePeopleRecords.js';

const buildTeamMemberSampleRecord = (sampleIndex) => {
  const peopleRecords = getSamplePeopleRecords();
  const personRecord = peopleRecords[sampleIndex % peopleRecords.length];
  const [portraitRecord, captionRecord] = buildTeamMemberDefaultChildren();
  portraitRecord.attributes = { ...portraitRecord.attributes, alt: 'Portrait of ' + personRecord.name };
  captionRecord.components[0].components = personRecord.name;
  captionRecord.components[1].components = personRecord.role;
  return { type: 'db-team-member', components: [portraitRecord, captionRecord] };
};

export default buildTeamMemberSampleRecord;
