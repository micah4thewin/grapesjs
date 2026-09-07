import findDescendantByField from './findDescendantByField.js';
import readComponentLiveText from './readComponentLiveText.js';
import writePortraitAlt from './writePortraitAlt.js';

const syncPortraitAltFromName = (rootComponent) => {
  const nameComponent = findDescendantByField(rootComponent, 'name');
  if (nameComponent) writePortraitAlt(rootComponent, readComponentLiveText(nameComponent));
};

export default syncPortraitAltFromName;
