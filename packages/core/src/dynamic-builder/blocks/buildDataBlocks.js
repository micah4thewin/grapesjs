import buildBlockDefinition from './buildBlockDefinition.js';
import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildRepeaterContentRecord from './buildRepeaterContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildDataBlocks = () => [
  buildBlockDefinition('db-repeater', 'Repeater', 'Data', 'collection', { type: 'db-repeater' }),
  buildBlockDefinition(
    'db-team-from-data',
    'Team from data',
    'Data',
    'team',
    buildRepeaterContentRecord('teamMembers', [
      buildHeadingContentRecord('3', '{{db:item.name}}'),
      buildTextContentRecord('{{db:item.role}}', 'small'),
      buildTextContentRecord('{{db:item.bio}}'),
    ]),
  ),
  buildBlockDefinition(
    'db-testimonials-from-data',
    'Testimonials from data',
    'Data',
    'testimonial',
    buildRepeaterContentRecord('testimonials', [
      buildTextContentRecord('"{{db:item.quote}}"', 'lead'),
      buildTextContentRecord('{{db:item.author}}, {{db:item.company}}', 'small'),
    ]),
  ),
  buildBlockDefinition(
    'db-faq-from-data',
    'FAQ from data',
    'Data',
    'faq',
    buildRepeaterContentRecord('faqItems', [
      buildHeadingContentRecord('3', '{{db:item.question}}'),
      buildTextContentRecord('{{db:item.answer}}'),
    ]),
  ),
];

export default buildDataBlocks;
