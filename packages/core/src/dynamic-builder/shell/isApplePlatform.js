const isApplePlatform = () => {
  const navigatorRecord = typeof navigator === 'undefined' ? null : navigator;
  if (!navigatorRecord) return false;
  const platformText =
    (navigatorRecord.userAgentData && navigatorRecord.userAgentData.platform) ||
    navigatorRecord.platform ||
    navigatorRecord.userAgent ||
    '';
  return /Mac|iPhone|iPad|iPod/i.test(String(platformText));
};

export default isApplePlatform;
