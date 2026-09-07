import getContentSectionTemplateRecords from './getContentSectionTemplateRecords.js';
import getFormSectionTemplateRecords from './getFormSectionTemplateRecords.js';
import getHeroSectionTemplateRecords from './getHeroSectionTemplateRecords.js';

const getBuiltInSectionTemplates = () => [
  ...getHeroSectionTemplateRecords(),
  ...getContentSectionTemplateRecords(),
  ...getFormSectionTemplateRecords(),
];

export default getBuiltInSectionTemplates;
