const getSharePreviewPlatformRecords = () => [
  { platformId: 'facebook', label: 'Facebook', titleLimit: 88, descriptionLimit: 110, showsDescription: true },
  { platformId: 'x', label: 'X', titleLimit: 70, descriptionLimit: 125, showsDescription: 'without-image' },
  { platformId: 'linkedin', label: 'LinkedIn', titleLimit: 119, descriptionLimit: 0, showsDescription: false },
];

export default getSharePreviewPlatformRecords;
