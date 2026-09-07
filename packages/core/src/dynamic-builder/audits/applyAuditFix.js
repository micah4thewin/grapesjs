import findComponentByIdAcrossPages from './findComponentByIdAcrossPages.js';
import resolveAuditFixDefinition from './resolveAuditFixDefinition.js';
import selectAuditPage from './selectAuditPage.js';

const applyAuditFix = (editor, fixId, componentId, pageId) => {
  const fixDefinition = resolveAuditFixDefinition(fixId);
  if (!fixDefinition) return null;
  selectAuditPage(editor, pageId);
  const component = componentId ? findComponentByIdAcrossPages(editor, componentId) : null;
  if (componentId && !component) return null;
  let wasApplied = false;
  try {
    wasApplied = fixDefinition.run(editor, component) === true;
  } catch (fixError) {
    console.error('dynamic-builder audit fix failed', fixError);
  }
  return wasApplied ? fixDefinition : null;
};

export default applyAuditFix;
