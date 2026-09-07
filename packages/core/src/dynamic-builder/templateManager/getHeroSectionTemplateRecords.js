import buildBuiltInTemplateRecords from './buildBuiltInTemplateRecords.js';
import buildHeroSectionRecord from './buildHeroSectionRecord.js';
import buildTemplateButtonRecord from './buildTemplateButtonRecord.js';

const buildCenteredHeroContent = () => [
  buildHeroSectionRecord({
    eyebrowText: 'New this season',
    titleText: 'Say the one thing that matters most',
    leadText: 'One sentence that explains what you do, who it is for, and why it is worth a minute of their time.',
    layoutName: 'centered',
    mediaName: 'none',
    buttonRecords: [
      buildTemplateButtonRecord('Get started', '#contact', 'primary'),
      buildTemplateButtonRecord('See how it works', '#features', 'ghost'),
    ],
  }),
];

const buildSplitHeroContent = () => [
  buildHeroSectionRecord({
    eyebrowText: 'Built for small teams',
    titleText: 'A calmer way to run the work',
    leadText: 'Put the picture beside the promise. Keep the paragraph short and let the button do the asking.',
    layoutName: 'split-media-right',
    buttonRecords: [
      buildTemplateButtonRecord('Try it free', '#contact', 'primary'),
      buildTemplateButtonRecord('Book a demo', '#contact', 'outline'),
    ],
  }),
];

const getHeroSectionTemplateRecords = () =>
  buildBuiltInTemplateRecords('section', [
    {
      templateId: 'db-section-hero-centered',
      name: 'Centered hero',
      categoryId: 'hero',
      description: 'Headline, one paragraph and two buttons, centred with no picture.',
      buildContent: buildCenteredHeroContent,
    },
    {
      templateId: 'db-section-hero-split',
      name: 'Hero with picture',
      categoryId: 'hero',
      description: 'Words on the left, a picture on the right, buttons underneath.',
      buildContent: buildSplitHeroContent,
    },
    {
      templateId: 'db-section-hero-cover',
      name: 'Full-screen photo cover',
      categoryId: 'hero',
      description: 'A large photo with a darkened overlay and centred text on top.',
      buildContent: () => [{ type: 'db-cover-photo' }],
    },
  ]);

export default getHeroSectionTemplateRecords;
