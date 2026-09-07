import describeShareImageProblem from './describeShareImageProblem.js';

const validateShareImageField = (rawValue, siteValues) => {
  const problemText = describeShareImageProblem(rawValue, siteValues.canonicalBase);
  return problemText ? { message: problemText, isBlocking: false } : '';
};

export default validateShareImageField;
