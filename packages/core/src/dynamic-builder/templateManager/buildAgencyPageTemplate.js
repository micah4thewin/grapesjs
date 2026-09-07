import buildCtaBandSectionRecord from './buildCtaBandSectionRecord.js';
import buildFeatureGridSectionRecord from './buildFeatureGridSectionRecord.js';
import buildHeroSectionRecord from './buildHeroSectionRecord.js';
import buildLogoBandSectionRecord from './buildLogoBandSectionRecord.js';
import buildStatsBandSectionRecord from './buildStatsBandSectionRecord.js';
import buildTemplateButtonRecord from './buildTemplateButtonRecord.js';
import buildTestimonialWallSectionRecord from './buildTestimonialWallSectionRecord.js';

const buildAgencyPageTemplate = () => [
  { type: 'db-navbar' },
  buildHeroSectionRecord({
    eyebrowText: 'Independent design studio',
    titleText: 'Brands that look like they mean it',
    leadText:
      'We help founder-led teams turn a rough idea into a brand, a website and a launch plan they can be proud of.',
    layoutName: 'split-media-right',
    buttonRecords: [
      buildTemplateButtonRecord('Start a project', '#contact', 'primary'),
      buildTemplateButtonRecord('See our work', '#work', 'outline'),
    ],
  }),
  buildLogoBandSectionRecord({ headingText: 'Teams we have worked with' }),
  buildFeatureGridSectionRecord({
    headingText: 'What we do',
    introText: 'Three ways we plug into your team, from a first sketch to a site that ships.',
    anchorId: 'services',
  }),
  buildStatsBandSectionRecord({
    headingText: 'The short version',
    introText: 'Numbers from the last two years of client work.',
  }),
  buildTestimonialWallSectionRecord({ headingText: 'What clients say', anchorId: 'work' }),
  buildCtaBandSectionRecord({
    headingText: 'Tell us what you are building',
    introText: 'Send a short brief and we will reply within one business day with next steps.',
    anchorId: 'contact',
    buttonRecords: [buildTemplateButtonRecord('Book an intro call', '#contact', 'primary')],
  }),
  { type: 'db-footer' },
];

export default buildAgencyPageTemplate;
