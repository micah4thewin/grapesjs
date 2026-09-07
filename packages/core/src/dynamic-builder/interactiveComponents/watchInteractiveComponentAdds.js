import prepareInteractiveComponent from './prepareInteractiveComponent.js';
import walkComponentTree from '../support/walkComponentTree.js';

const watchInteractiveComponentAdds = (editor, interactiveTextDefaults) => {
  const prepareComponent = (component) => prepareInteractiveComponent(editor, component, interactiveTextDefaults);
  editor.on('component:add', prepareComponent);
  editor.on('load', () => {
    const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
    pageList.forEach((sitePage) => {
      const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
      walkComponentTree(mainComponent, prepareComponent);
    });
  });
};

export default watchInteractiveComponentAdds;
