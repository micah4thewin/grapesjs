import getSharePreviewPlatformRecords from './getSharePreviewPlatformRecords.js';

const findSharePreviewPlatform = (platformId) => {
  const platformRecords = getSharePreviewPlatformRecords();
  return platformRecords.find((platformRecord) => platformRecord.platformId === platformId) || platformRecords[0];
};

export default findSharePreviewPlatform;
