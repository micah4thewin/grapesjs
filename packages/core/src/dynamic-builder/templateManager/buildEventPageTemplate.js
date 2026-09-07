import buildCtaBandSectionRecord from './buildCtaBandSectionRecord.js';
import buildDefaultDeadlineDate from '../blocks/buildDefaultDeadlineDate.js';
import buildDetailListSectionRecord from './buildDetailListSectionRecord.js';
import buildFaqSectionRecord from './buildFaqSectionRecord.js';
import buildHeroSectionRecord from './buildHeroSectionRecord.js';
import buildTemplateButtonRecord from './buildTemplateButtonRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildEventPageTemplate = () => [
  { type: 'db-navbar' },
  buildHeroSectionRecord({
    eyebrowText: 'One day, one room, one topic',
    titleText: 'A working day for people who build on the web',
    leadText: 'Six talks, two workshops and a long lunch. Tickets are limited to keep the hallway track useful.',
    layoutName: 'centered',
    mediaName: 'none',
    buttonRecords: [
      buildTemplateButtonRecord('Get a ticket', '#tickets', 'primary'),
      buildTemplateButtonRecord('See the schedule', '#schedule', 'outline'),
    ],
  }),
  buildTemplateSectionRecord(
    {
      headingText: 'Doors open in',
      introText: 'Early tickets end when the clock runs out.',
      centered: true,
      themeName: 'light',
    },
    [{ type: 'db-countdown', attributes: { 'data-db-deadline-date': buildDefaultDeadlineDate() } }],
  ),
  buildDetailListSectionRecord({
    headingText: 'The schedule',
    introText: 'Talks in the morning, hands-on work after lunch, and time to talk in between.',
    anchorId: 'schedule',
    columnItemTexts: [
      ['09:30 Doors, coffee and pastries', '10:00 Opening talk: shipping smaller', '11:15 Three short case studies'],
      ['13:00 Long lunch in the courtyard', '14:30 Workshop tracks, pick one', '17:00 Closing notes and drinks'],
    ],
  }),
  buildFaqSectionRecord({ headingText: 'Questions before you book', themeName: 'light' }),
  buildCtaBandSectionRecord({
    headingText: 'Save your seat',
    introText: 'Tickets include lunch, both workshops and the recordings afterwards.',
    anchorId: 'tickets',
    buttonRecords: [buildTemplateButtonRecord('Buy a ticket', '#tickets', 'primary')],
  }),
  { type: 'db-footer' },
];

export default buildEventPageTemplate;
