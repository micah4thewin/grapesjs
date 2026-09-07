import attachDeviceVisibilityTrait from './attachDeviceVisibilityTrait.js';
import createDeviceVisibilityTraitDefinition from './createDeviceVisibilityTraitDefinition.js';
import getDevicesEditorCss from './getDevicesEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import mountDeviceWidthReadout from './mountDeviceWidthReadout.js';
import openCustomDeviceWidthModal from './openCustomDeviceWidthModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerDevicePresets from './registerDevicePresets.js';
import registerTraitTypeSet from '../support/registerTraitTypeSet.js';
import watchDeviceVisibilityUsage from './watchDeviceVisibilityUsage.js';

const applyResponsiveDevices = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.devices) || {};
  registerDevicePresets(editor, moduleOptions);
  if (editor.TraitManager && editor.TraitManager.addType) {
    registerTraitTypeSet(editor, { 'db-device-visibility': createDeviceVisibilityTraitDefinition(editor) });
  }
  if (!editor.on) return;
  attachDeviceVisibilityTrait(editor);
  watchDeviceVisibilityUsage(editor);
  registerCommandSet(editor, {
    'db:open-device-width': { run: (editorInstance) => openCustomDeviceWidthModal(editorInstance) },
  });
  const injectStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-devices', getDevicesEditorCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(injectStyles);
  mountDeviceWidthReadout(editor);
};

export default applyResponsiveDevices;
