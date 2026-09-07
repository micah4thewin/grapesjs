import findComponentByIdAcrossPages from './findComponentByIdAcrossPages.js';
import selectAuditPage from './selectAuditPage.js';

const locateAuditComponent = (editor, componentOrId, pageId) => {
  selectAuditPage(editor, pageId);
  const component =
    componentOrId && componentOrId.getId ? componentOrId : findComponentByIdAcrossPages(editor, componentOrId);
  if (!component) return false;
  if (editor.Modal && editor.Modal.close) editor.Modal.close();
  editor.select(component);
  try {
    editor.Canvas && editor.Canvas.scrollTo && editor.Canvas.scrollTo(component, { behavior: 'smooth' });
  } catch (scrollError) {
    console.error('dynamic-builder could not scroll to the audited component', scrollError);
  }
  return true;
};

export default locateAuditComponent;
