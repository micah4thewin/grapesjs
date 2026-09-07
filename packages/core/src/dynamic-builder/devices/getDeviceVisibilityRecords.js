const getDeviceVisibilityRecords = () => [
  { className: 'db-hide-desktop', label: 'Desktop', help: 'wider than 992 px' },
  { className: 'db-hide-tablet', label: 'Tablet', help: '768 to 992 px' },
  { className: 'db-hide-mobile', label: 'Phone', help: 'up to 767 px' },
];

export default getDeviceVisibilityRecords;
