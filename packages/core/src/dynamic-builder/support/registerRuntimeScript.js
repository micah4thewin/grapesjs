import getRuntimeScriptRegistry from './getRuntimeScriptRegistry.js';

const registerRuntimeScript = (editor, runtimeId, runtimeRecord) => {
  getRuntimeScriptRegistry(editor).set(runtimeId, runtimeRecord);
  return runtimeRecord;
};

export default registerRuntimeScript;
