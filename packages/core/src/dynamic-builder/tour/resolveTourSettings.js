import getDriverCdnRecord from './getDriverCdnRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const readUrlValue = (optionValue, defaultUrl) =>
  optionValue === undefined ? defaultUrl : String(optionValue || '').trim();

const resolveTourSettings = (pluginOptions) => {
  const tourRecord = isPlainRecord(pluginOptions && pluginOptions.tour) ? pluginOptions.tour : {};
  const cdnRecord = getDriverCdnRecord();
  const scriptUrl = readUrlValue(tourRecord.driverScriptUrl, cdnRecord.scriptUrl);
  const styleUrl = readUrlValue(tourRecord.driverStyleUrl, cdnRecord.styleUrl);
  const startDelay = Number(tourRecord.startDelay);
  return {
    enabled: tourRecord.enabled !== false,
    autoStart: tourRecord.autoStart !== false,
    showHelpControl: tourRecord.helpControl !== false,
    startDelay: startDelay > 0 ? Math.min(startDelay, 20000) : 1800,
    scriptUrl,
    styleUrl,
    integrity: String(
      tourRecord.integrity === undefined && scriptUrl === cdnRecord.scriptUrl
        ? cdnRecord.scriptIntegrity
        : tourRecord.integrity || '',
    ),
    styleIntegrity: String(
      tourRecord.styleIntegrity === undefined && styleUrl === cdnRecord.styleUrl
        ? cdnRecord.styleIntegrity
        : tourRecord.styleIntegrity || '',
    ),
  };
};

export default resolveTourSettings;
