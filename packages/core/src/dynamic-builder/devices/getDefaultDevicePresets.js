const getDefaultDevicePresets = () => [
  { id: 'desktop', name: 'Desktop', width: '' },
  { id: 'laptop', name: 'Laptop', width: '1200px', widthMedia: '1200px' },
  { id: 'tabletLandscape', name: 'Tablet landscape', width: '992px', widthMedia: '992px' },
  { id: 'tabletPortrait', name: 'Tablet portrait', width: '768px', widthMedia: '768px' },
  { id: 'mobileLandscape', name: 'Mobile landscape', width: '568px', widthMedia: '576px' },
  { id: 'mobilePortrait', name: 'Mobile portrait', width: '375px', widthMedia: '480px' },
];

export default getDefaultDevicePresets;
