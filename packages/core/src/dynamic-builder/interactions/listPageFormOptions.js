import walkComponentTree from '../support/walkComponentTree.js';

const isFormComponent = (component) =>
  !!component.get &&
  (component.get('type') === 'db-form' || String(component.get('tagName') || '').toLowerCase() === 'form');

const listPageFormOptions = (editor, component) => {
  const selectedPage = editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected();
  const mainComponent = selectedPage && selectedPage.getMainComponent ? selectedPage.getMainComponent() : null;
  const formOptions = [];
  walkComponentTree(mainComponent, (currentComponent) => {
    if (currentComponent === component || !isFormComponent(currentComponent)) return;
    const formLabel = String((currentComponent.getName && currentComponent.getName()) || 'Form').trim();
    formOptions.push({ id: '#' + currentComponent.getId(), label: formLabel + ' (#' + currentComponent.getId() + ')' });
  });
  return formOptions;
};

export default listPageFormOptions;
