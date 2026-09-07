const describeDeviceWidth = (editor) => {
  const deviceManager = editor.Devices;
  const selectedDevice = deviceManager && deviceManager.getSelected ? deviceManager.getSelected() : null;
  const frameElement = editor.Canvas && editor.Canvas.getFrameEl ? editor.Canvas.getFrameEl() : null;
  const measuredWidth = frameElement ? Math.round(frameElement.getBoundingClientRect().width) : 0;
  const presetWidth = selectedDevice ? parseInt(selectedDevice.get('width'), 10) || 0 : 0;
  const shownWidth = presetWidth || measuredWidth;
  const deviceName = selectedDevice ? selectedDevice.getName() : 'Canvas';
  const mediaWidth = selectedDevice ? parseInt(selectedDevice.get('widthMedia'), 10) || 0 : 0;
  const mediaText = mediaWidth && mediaWidth !== shownWidth ? ` (styles apply up to ${mediaWidth} px)` : '';
  return `${deviceName} \u00b7 ${shownWidth || '?'} px${mediaText}`;
};

export default describeDeviceWidth;
