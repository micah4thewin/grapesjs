import buildDefaultDeadlineDate from './buildDefaultDeadlineDate.js';
import buildNewsletterFormRecord from './buildNewsletterFormRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';

const getLaunchTemplateComponents = () => [
  buildTemplateIntroSection(
    'Something good is coming',
    'We are putting the finishing touches on our next release. Leave your email and be the first to know.',
    [
      { type: 'db-countdown', attributes: { 'data-db-deadline-date': buildDefaultDeadlineDate() } },
      buildNewsletterFormRecord('Notify me'),
      { type: 'db-social-links' },
    ],
    { attributes: { 'data-db-layout': 'narrow', 'data-db-theme': 'light' } },
  ),
  { type: 'db-footer' },
];

export default getLaunchTemplateComponents;
