const wireDeviceButtons = (editor, stripElement) => {
  const refreshPressedStates = () => {
    const selectedDevice = editor.Devices.getSelected();
    const selectedDeviceId = selectedDevice ? String(selectedDevice.get('id')) : '';
    stripElement.querySelectorAll('[data-db-device]').forEach((deviceButton) => {
      const isSelected = deviceButton.getAttribute('data-db-device') === selectedDeviceId;
      deviceButton.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  };
  editor.on('device:select', refreshPressedStates);
  refreshPressedStates();
};

export default wireDeviceButtons;
