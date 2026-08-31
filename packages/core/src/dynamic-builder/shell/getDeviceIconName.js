const getDeviceIconName = (deviceId) => {
  const normalizedId = String(deviceId || '').toLowerCase();
  if (normalizedId.indexOf('mobile') >= 0 || normalizedId.indexOf('phone') >= 0) return 'mobile';
  if (normalizedId.indexOf('tablet') >= 0) return 'tablet';
  if (normalizedId.indexOf('laptop') >= 0) return 'laptop';
  return 'desktop';
};

export default getDeviceIconName;
