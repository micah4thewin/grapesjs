import formatDeviceWidthText from './formatDeviceWidthText.js';

const describeDeviceLabelText = (deviceModel) => {
  const deviceName = deviceModel.getName ? deviceModel.getName() : '';
  const displayName = deviceName || String(deviceModel.get('id'));
  return `${displayName} \u00b7 ${formatDeviceWidthText(deviceModel)}`;
};

export default describeDeviceLabelText;
