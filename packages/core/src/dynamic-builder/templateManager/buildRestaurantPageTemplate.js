import buildContactSplitSectionRecord from './buildContactSplitSectionRecord.js';
import buildDetailListSectionRecord from './buildDetailListSectionRecord.js';
import buildGallerySectionRecord from './buildGallerySectionRecord.js';
import buildHeroSectionRecord from './buildHeroSectionRecord.js';
import buildTemplateButtonRecord from './buildTemplateButtonRecord.js';
import buildTestimonialWallSectionRecord from './buildTestimonialWallSectionRecord.js';

const buildRestaurantPageTemplate = () => [
  { type: 'db-navbar' },
  buildHeroSectionRecord({
    eyebrowText: 'Open Tuesday to Sunday',
    titleText: 'Slow cooking, small room, short menu',
    leadText: 'A neighbourhood kitchen serving whatever the market gave us that morning. Twenty-four seats only.',
    layoutName: 'split-media-left',
    buttonRecords: [
      buildTemplateButtonRecord('Book a table', '#contact', 'primary'),
      buildTemplateButtonRecord('See the menu', '#menu', 'ghost'),
    ],
  }),
  buildDetailListSectionRecord({
    headingText: 'This week on the menu',
    introText: 'The list changes every Tuesday. Ask us about anything you cannot eat and we will work around it.',
    anchorId: 'menu',
    themeName: 'light',
    columnItemTexts: [
      [
        'Charred leeks, hazelnut, aged sheep cheese',
        'Slow beef shin with soft polenta',
        'Sourdough, cultured butter, sea salt',
      ],
      ['Roast pear and almond tart', 'Buttermilk pudding with honey', 'Small plates from the counter, all day'],
    ],
  }),
  buildGallerySectionRecord({
    headingText: 'The room',
    introText: 'Warm light, an open pass, and a record player that never quite stops.',
  }),
  buildTestimonialWallSectionRecord({ headingText: 'What regulars say' }),
  buildContactSplitSectionRecord({
    headingText: 'Find us and book',
    introText: 'Tables for two to six online. For larger groups send us a note and we will call you back.',
  }),
  { type: 'db-footer' },
];

export default buildRestaurantPageTemplate;
