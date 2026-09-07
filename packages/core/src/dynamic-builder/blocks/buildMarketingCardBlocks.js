import buildBlockDefinition from './buildBlockDefinition.js';
import buildCardSampleRecord from './buildCardSampleRecord.js';
import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTeamMemberSampleRecord from './buildTeamMemberSampleRecord.js';
import buildTestimonialSampleRecord from './buildTestimonialSampleRecord.js';
import buildThreeUpSampleColumns from './buildThreeUpSampleColumns.js';

const buildMarketingCardBlocks = () => [
  buildBlockDefinition('db-card', 'Card', 'Marketing', 'card', { type: 'db-card' }),
  buildBlockDefinition(
    'db-card-grid',
    'Card grid',
    'Marketing',
    'grid',
    buildSectionContentRecord([buildThreeUpSampleColumns(buildCardSampleRecord, 'Card grid')]),
  ),
  buildBlockDefinition('db-testimonial', 'Testimonial', 'Marketing', 'testimonial', { type: 'db-testimonial' }),
  buildBlockDefinition(
    'db-testimonial-trio',
    'Testimonial trio',
    'Marketing',
    'quote',
    buildSectionContentRecord(
      [
        buildHeadingContentRecord('2', 'Loved by teams like yours'),
        buildThreeUpSampleColumns(buildTestimonialSampleRecord, 'Testimonial trio'),
      ],
      { centered: true },
    ),
  ),
  buildBlockDefinition(
    'db-logo-cloud',
    'Logo row',
    'Marketing',
    'logoCloud',
    buildSectionContentRecord([{ type: 'db-logo-cloud' }]),
  ),
  buildBlockDefinition(
    'db-stats-row',
    'Stats',
    'Marketing',
    'stats',
    buildSectionContentRecord([{ type: 'db-stats' }]),
  ),
  buildBlockDefinition('db-pricing', 'Pricing', 'Marketing', 'pricing', { type: 'db-pricing' }),
  buildBlockDefinition(
    'db-team-grid',
    'Team grid',
    'Marketing',
    'team',
    buildSectionContentRecord(
      [
        buildHeadingContentRecord('2', 'Meet the team'),
        buildThreeUpSampleColumns(buildTeamMemberSampleRecord, 'Team grid'),
      ],
      { centered: true },
    ),
  ),
];

export default buildMarketingCardBlocks;
