import getAnimationEasingRecords from './getAnimationEasingRecords.js';
import getAnimationEffectRecords from './getAnimationEffectRecords.js';

const motionCategory = { id: 'db-motion', label: 'Animate on scroll', open: false };

const withHelp = (helpText) => ({ title: helpText });

const buildAnimationTraitDefinitions = () => [
  {
    type: 'select',
    name: 'data-db-aos',
    label: 'Effect',
    category: motionCategory,
    default: 'none',
    attributes: withHelp('How this element appears when it scrolls into view.'),
    options: getAnimationEffectRecords().map((effectRecord) => ({
      id: effectRecord.id,
      label: effectRecord.label,
    })),
  },
  {
    type: 'button',
    name: 'db-aos-browse',
    label: 'Gallery',
    category: motionCategory,
    text: 'Browse effects',
    command: 'db:browse-animations',
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-duration',
    label: 'Duration (ms)',
    category: motionCategory,
    attributes: withHelp('How long the animation takes, in milliseconds. 700 is a gentle default.'),
    min: 100,
    max: 2400,
    step: 50,
    default: '700',
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-delay',
    label: 'Start delay (ms)',
    category: motionCategory,
    attributes: withHelp('Wait this long before the animation starts, in milliseconds.'),
    min: 0,
    max: 2000,
    step: 50,
    default: '0',
  },
  {
    type: 'select',
    name: 'data-db-aos-easing',
    label: 'Motion curve',
    category: motionCategory,
    default: 'ease-out',
    attributes: withHelp('The feel of the movement: settle gently, glide, move steadily or bounce a little.'),
    options: getAnimationEasingRecords().map((easingRecord) => ({
      id: easingRecord.id,
      label: easingRecord.label,
    })),
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-offset',
    label: 'Start offset (px)',
    category: motionCategory,
    attributes: withHelp('Start when the element is this many pixels above the bottom edge of the screen.'),
    min: 0,
    max: 400,
    step: 10,
    default: '80',
  },
  {
    type: 'select',
    name: 'data-db-aos-once',
    label: 'Repeat',
    category: motionCategory,
    default: 'true',
    attributes: withHelp('Play once, or again every time the element scrolls back into view.'),
    options: [
      { id: 'true', label: 'Play once' },
      { id: 'false', label: 'Every time it scrolls into view' },
    ],
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-stagger',
    label: 'Stagger children (ms)',
    category: motionCategory,
    attributes: withHelp(
      'Animate each item inside this block one after another, this many milliseconds apart. 0 moves the block as one.',
    ),
    min: 0,
    max: 600,
    step: 20,
    default: '0',
  },
  {
    type: 'button',
    name: 'db-aos-preview',
    label: 'Preview',
    category: motionCategory,
    text: 'Preview on canvas',
    command: 'db:preview-animations',
  },
];

export default buildAnimationTraitDefinitions;
