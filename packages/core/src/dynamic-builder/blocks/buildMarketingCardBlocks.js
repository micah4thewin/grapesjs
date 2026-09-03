import buildBlockDefinition from './buildBlockDefinition.js';
import buildColumnsContentRecord from './buildColumnsContentRecord.js';

const buildMarketingCardBlocks = () => [
  buildBlockDefinition('db-card', 'Card', 'Marketing', 'card', { type: 'db-card' }),
  buildBlockDefinition(
    'db-card-grid',
    'Card grid',
    'Marketing',
    'grid',
    buildColumnsContentRecord('three', [[{ type: 'db-card' }], [{ type: 'db-card' }], [{ type: 'db-card' }]]),
  ),
  buildBlockDefinition('db-testimonial', 'Testimonial', 'Marketing', 'testimonial', { type: 'db-testimonial' }),
  buildBlockDefinition(
    'db-testimonial-trio',
    'Testimonial trio',
    'Marketing',
    'quote',
    buildColumnsContentRecord('three', [
      [{ type: 'db-testimonial' }],
      [{ type: 'db-testimonial' }],
      [{ type: 'db-testimonial' }],
    ]),
  ),
  buildBlockDefinition('db-logo-cloud', 'Logo cloud', 'Marketing', 'logoCloud', { type: 'db-logo-cloud' }),
  buildBlockDefinition('db-stats-row', 'Stats', 'Marketing', 'stats', { type: 'db-stats' }),
  buildBlockDefinition('db-pricing', 'Pricing', 'Marketing', 'pricing', { type: 'db-pricing' }),
  buildBlockDefinition(
    'db-team-grid',
    'Team grid',
    'Marketing',
    'team',
    buildColumnsContentRecord('three', [
      [{ type: 'db-team-member' }],
      [{ type: 'db-team-member' }],
      [{ type: 'db-team-member' }],
    ]),
  ),
];

export default buildMarketingCardBlocks;
