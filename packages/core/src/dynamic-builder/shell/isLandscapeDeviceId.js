const isLandscapeDeviceId = (deviceId) =>
  String(deviceId || '')
    .toLowerCase()
    .indexOf('landscape') >= 0;

export default isLandscapeDeviceId;
