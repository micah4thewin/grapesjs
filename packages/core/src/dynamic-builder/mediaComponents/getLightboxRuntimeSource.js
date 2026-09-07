import runLightboxRuntime from './runLightboxRuntime.js';

const getLightboxRuntimeSource = () => '(' + String(runLightboxRuntime) + ')();';

export default getLightboxRuntimeSource;
