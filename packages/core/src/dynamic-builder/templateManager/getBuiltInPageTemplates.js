import getBlockPageTemplateRecords from './getBlockPageTemplateRecords.js';
import getStudioPageTemplateRecords from './getStudioPageTemplateRecords.js';

const getBuiltInPageTemplates = () => [...getBlockPageTemplateRecords(), ...getStudioPageTemplateRecords()];

export default getBuiltInPageTemplates;
