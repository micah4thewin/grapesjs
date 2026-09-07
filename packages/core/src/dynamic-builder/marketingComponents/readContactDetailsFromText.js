import findDescendantByField from './findDescendantByField.js';
import readComponentLiveText from './readComponentLiveText.js';

const readContactDetailsFromText = (contactComponent) => {
  const readField = (fieldName) => readComponentLiveText(findDescendantByField(contactComponent, fieldName));
  return { address: readField('address'), phone: readField('phone'), email: readField('email') };
};

export default readContactDetailsFromText;
