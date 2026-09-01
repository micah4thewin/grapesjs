import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const getLaunchTemplateComponents = () => [
  { type: 'db-announcement' },
  buildTemplateSectionRecord(
    buildTemplateHeadingRecords(
      'Something good is coming',
      'We are putting the finishing touches on our next release. Leave your email and be first to know.',
    ),
  ),
  buildTemplateSectionRecord([{ type: 'db-countdown' }]),
  buildTemplateSectionRecord([{ type: 'db-form' }]),
  buildTemplateSectionRecord([{ type: 'db-social-links' }]),
  { type: 'db-footer' },
];

export default getLaunchTemplateComponents;
