import buildContactSplitSectionRecord from './buildContactSplitSectionRecord.js';
import buildFeatureGridSectionRecord from './buildFeatureGridSectionRecord.js';
import buildHeroSectionRecord from './buildHeroSectionRecord.js';
import buildTemplateButtonRecord from './buildTemplateButtonRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';
import buildTestimonialWallSectionRecord from './buildTestimonialWallSectionRecord.js';

const buildConsultantPageTemplate = () => [
  { type: 'db-navbar' },
  buildHeroSectionRecord({
    eyebrowText: 'Operations consultant',
    titleText: 'I help small teams stop firefighting',
    leadText:
      'Ten years of untangling processes for teams of five to fifty. Clear scopes, fixed fees, and no long retainers.',
    layoutName: 'split-media-right',
    buttonRecords: [
      buildTemplateButtonRecord('Book a free call', '#contact', 'primary'),
      buildTemplateButtonRecord('How I work', '#services', 'ghost'),
    ],
  }),
  buildFeatureGridSectionRecord({
    headingText: 'How I can help',
    introText: 'Pick the shape that fits. Every engagement starts with a short, honest diagnostic.',
    anchorId: 'services',
    columnCount: '3',
  }),
  buildTemplateSectionRecord(
    {
      headingText: 'A little about me',
      introText:
        'I started out running support for a logistics company, which is a polite way of saying I learned to fix things fast. Now I do that on purpose, with a plan.',
      layoutName: 'narrow',
      themeName: 'light',
      anchorId: 'about',
    },
    [],
  ),
  buildTestimonialWallSectionRecord({ headingText: 'Clients on working together' }),
  buildContactSplitSectionRecord({
    headingText: 'Get in touch',
    introText: 'Tell me what is slowing your team down and I will tell you whether I can help.',
  }),
  { type: 'db-footer' },
];

export default buildConsultantPageTemplate;
