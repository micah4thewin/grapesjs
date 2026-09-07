import getLightboxRuntimeSource from './getLightboxRuntimeSource.js';
import hasLightboxGallery from './hasLightboxGallery.js';
import registerRuntimeScript from '../support/registerRuntimeScript.js';
import runCanvasLightboxRuntime from './runCanvasLightboxRuntime.js';

const registerLightboxRuntime = (editor) => {
  registerRuntimeScript(editor, 'db-lightbox', {
    detect: (runtimeEditor, page) => hasLightboxGallery(runtimeEditor, page),
    source: () => getLightboxRuntimeSource(),
  });
  editor.on('command:run:core:preview', () => setTimeout(() => runCanvasLightboxRuntime(editor), 120));
};

export default registerLightboxRuntime;
