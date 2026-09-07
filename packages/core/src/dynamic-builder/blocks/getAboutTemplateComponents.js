import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTeamMemberSampleRecord from './buildTeamMemberSampleRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';
import buildThreeUpSampleColumns from './buildThreeUpSampleColumns.js';

const getAboutTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection(
    'About us',
    'We are a small team that cares deeply about our craft and the people we build for.',
  ),
  buildSectionContentRecord(
    [
      buildHeadingContentRecord('2', 'Meet the team'),
      buildThreeUpSampleColumns(buildTeamMemberSampleRecord, 'Team grid'),
    ],
    { centered: true, attributes: { 'data-db-theme': 'light' } },
  ),
  buildSectionContentRecord([buildHeadingContentRecord('2', 'Trusted by kind people'), { type: 'db-logo-cloud' }], {
    centered: true,
  }),
  { type: 'db-footer' },
];

export default getAboutTemplateComponents;
