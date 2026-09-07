const formatDeviceWidthText = (deviceModel) => {
  const widthValue = deviceModel && deviceModel.get ? String(deviceModel.get('width') || '').trim() : '';
  return widthValue || 'Full width';
};

export default formatDeviceWidthText;
