import getPageSeoFieldValidators from './getPageSeoFieldValidators.js';
import getSiteSeoFieldValidators from './getSiteSeoFieldValidators.js';

const getSeoFieldValidators = () => ({ ...getSiteSeoFieldValidators(), ...getPageSeoFieldValidators() });

export default getSeoFieldValidators;
