import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyGuidedTour from '../../../src/dynamic-builder/tour/applyGuidedTour';
import resolveTourStepTargets from '../../../src/dynamic-builder/tour/resolveTourStepTargets';

test('debug tour', async () => {
  window.Element.prototype.scrollIntoView = () => {};
  document.body.innerHTML = '<div id="db-editor"></div>';
  const editor = grapesjs.init({
    container: '#db-editor',
    storageManager: { autoload: false, autosave: false, type: '' },
    plugins: [
      fixJsDom,
      (editorInstance) => {
        grapesjs.dynamicBuilder(editorInstance, { shell: { firstRunWizard: false } });
        applyGuidedTour(editorInstance, { tour: { driverScriptUrl: '', startDelay: 10 } });
      },
    ],
  });
  fixJsDomIframe(editor.getModel().shallow);
  await new Promise((resolve) => editor.onReady(() => setTimeout(resolve, 10)));
  const container = editor.getContainer();
  console.log('workspace', Boolean(container.querySelector('[data-db-workspace]')));
  console.log('help', Boolean(container.querySelector('[data-db-tour-help]')));
  console.log('steps', resolveTourStepTargets(container).map((s) => s.id));
  console.log('pref', window.localStorage.getItem('db-editor:db-editor:guided-tour'));
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log('root', Boolean(document.querySelector('[data-db-tour-root]')));
  console.log('marker', container.getAttribute('data-db-tour-running'));
  editor.destroy();
}, 30000);
