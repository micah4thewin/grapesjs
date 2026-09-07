import buildBuiltInTemplateRecords from './buildBuiltInTemplateRecords.js';
import buildCardGridSectionRecord from './buildCardGridSectionRecord.js';
import buildCtaBandSectionRecord from './buildCtaBandSectionRecord.js';
import buildFaqSectionRecord from './buildFaqSectionRecord.js';
import buildFeatureGridSectionRecord from './buildFeatureGridSectionRecord.js';
import buildLogoBandSectionRecord from './buildLogoBandSectionRecord.js';
import buildStatsBandSectionRecord from './buildStatsBandSectionRecord.js';
import buildTemplateButtonRecord from './buildTemplateButtonRecord.js';
import buildTestimonialWallSectionRecord from './buildTestimonialWallSectionRecord.js';
import getSectionTemplateCopyRecords from './getSectionTemplateCopyRecords.js';

const getContentSectionTemplateRecords = () => {
  const copyRecords = getSectionTemplateCopyRecords();
  return buildBuiltInTemplateRecords('section', [
    {
      templateId: 'db-section-feature-grid',
      name: 'Three feature grid',
      categoryId: 'features',
      description: 'Three short highlights in a row, each with an icon and a line of text.',
      buildContent: () => [buildFeatureGridSectionRecord(copyRecords.featureGrid)],
    },
    {
      templateId: 'db-section-card-grid',
      name: 'Card grid',
      categoryId: 'features',
      description: 'Three picture cards with a title, a sentence and a link.',
      buildContent: () => [buildCardGridSectionRecord(copyRecords.cardGrid)],
    },
    {
      templateId: 'db-section-stats-band',
      name: 'Numbers band',
      categoryId: 'socialProof',
      description: 'A light strip of four numbers that count up as visitors scroll.',
      buildContent: () => [buildStatsBandSectionRecord(copyRecords.statsBand)],
    },
    {
      templateId: 'db-section-testimonials',
      name: 'Testimonial wall',
      categoryId: 'socialProof',
      description: 'Three customer quotes side by side with names and ratings.',
      buildContent: () => [buildTestimonialWallSectionRecord(copyRecords.testimonials)],
    },
    {
      templateId: 'db-section-logo-band',
      name: 'Logo band',
      categoryId: 'socialProof',
      description: 'A quiet row of client or partner logos under a short heading.',
      buildContent: () => [buildLogoBandSectionRecord(copyRecords.logoBand)],
    },
    {
      templateId: 'db-section-faq',
      name: 'Questions and answers',
      categoryId: 'faq',
      description: 'A narrow column of questions that open one at a time.',
      buildContent: () => [buildFaqSectionRecord(copyRecords.faq)],
    },
    {
      templateId: 'db-section-cta-band',
      name: 'Call to action band',
      categoryId: 'callToAction',
      description: 'A brand-coloured strip with one heading and one button.',
      buildContent: () => [
        buildCtaBandSectionRecord({
          ...copyRecords.ctaBand,
          buttonRecords: [buildTemplateButtonRecord('Get started', '#contact', 'primary')],
        }),
      ],
    },
  ]);
};

export default getContentSectionTemplateRecords;
