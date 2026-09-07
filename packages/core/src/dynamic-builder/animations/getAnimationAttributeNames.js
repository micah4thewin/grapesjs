import getAnimationAttributeDefaults from './getAnimationAttributeDefaults.js';

const getAnimationAttributeNames = () => [
  'data-db-aos',
  ...Object.keys(getAnimationAttributeDefaults()),
  'data-db-aos-stagger',
  'data-db-aos-in',
  'data-db-aos-generated',
];

export default getAnimationAttributeNames;
