import walkComponentTree from '../support/walkComponentTree.js';
import applyMarketingFieldPreset from './applyMarketingFieldPreset.js';
import findDescendantByField from './findDescendantByField.js';
import getTeamMemberPresetRecords from './getTeamMemberPresetRecords.js';
import getTestimonialPresetRecords from './getTestimonialPresetRecords.js';
import isComponentOfType from './isComponentOfType.js';
import readComponentPlainText from './readComponentPlainText.js';

const rotateMarketingPresetCopy = (editor, droppedComponent) => {
  const collectOfType = (rootComponent, typeName) => {
    const matchedComponents = [];
    walkComponentTree(rootComponent, (currentComponent) => {
      if (isComponentOfType(currentComponent, typeName)) matchedComponents.push(currentComponent);
    });
    return matchedComponents;
  };
  const rotateType = (typeName, presetRecords) => {
    const droppedMatches = collectOfType(droppedComponent, typeName);
    const droppedNames = droppedMatches.map((match) => readComponentPlainText(findDescendantByField(match, 'name')));
    if (!droppedMatches.length || new Set(droppedNames).size > 1) return;
    const pageMatches = collectOfType(editor.getWrapper ? editor.getWrapper() : null, typeName);
    const existingCount = Math.max(0, pageMatches.length - droppedMatches.length);
    droppedMatches.forEach((matchedComponent, matchIndex) => {
      applyMarketingFieldPreset(matchedComponent, presetRecords[(existingCount + matchIndex) % presetRecords.length]);
    });
  };
  rotateType('db-testimonial', getTestimonialPresetRecords());
  rotateType('db-team-member', getTeamMemberPresetRecords());
};

export default rotateMarketingPresetCopy;
