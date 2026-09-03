import isPlainRecord from '../support/isPlainRecord.js';

const defaultScriptUrl = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js';

const resolveInteractionSettings = (moduleOptions) => {
  const optionRecord = isPlainRecord(moduleOptions) ? moduleOptions : {};
  const dialogRecord = isPlainRecord(optionRecord.sweetAlert) ? optionRecord.sweetAlert : {};
  return {
    enabled: dialogRecord.enabled !== false,
    scriptUrl: dialogRecord.scriptUrl === undefined ? defaultScriptUrl : String(dialogRecord.scriptUrl || ''),
    styleUrl: String(dialogRecord.styleUrl || ''),
    integrity: String(dialogRecord.integrity || ''),
  };
};

export default resolveInteractionSettings;
