import getAnimationEasingRecords from './getAnimationEasingRecords.js';
import getAnimationEffectRecords from './getAnimationEffectRecords.js';

const motionCategory = { id: 'db-motion', label: 'Animate on scroll', open: false };

const buildAnimationTraitDefinitions = () => [
  {
    type: 'select',
    name: 'data-db-aos',
    label: 'Effect',
    category: motionCategory,
    default: 'none',
    options: getAnimationEffectRecords().map((effectRecord) => ({
      id: effectRecord.id,
      label: effectRecord.label,
    })),
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-duration',
    label: 'Duration',
    category: motionCategory,
    min: 100,
    max: 2400,
    step: 50,
    default: '700',
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-delay',
    label: 'Delay',
    category: motionCategory,
    min: 0,
    max: 2000,
    step: 50,
    default: '0',
  },
  {
    type: 'select',
    name: 'data-db-aos-easing',
    label: 'Easing',
    category: motionCategory,
    default: 'ease-out',
    options: getAnimationEasingRecords().map((easingRecord) => ({
      id: easingRecord.id,
      label: easingRecord.label,
    })),
  },
  {
    type: 'db-slider',
    name: 'data-db-aos-offset',
    label: 'Trigger offset',
    category: motionCategory,
    min: 0,
    max: 400,
    step: 10,
    default: '80',
  },
  {
    type: 'checkbox',
    name: 'data-db-aos-once',
    label: 'Play once',
    category: motionCategory,
    valueTrue: 'true',
    valueFalse: 'false',
    default: 'true',
  },
  {
    type: 'button',
    name: 'db-aos-preview',
    label: '',
    category: motionCategory,
    text: 'Preview on canvas',
    full: true,
    command: 'db:preview-animations',
  },
];

export default buildAnimationTraitDefinitions;
