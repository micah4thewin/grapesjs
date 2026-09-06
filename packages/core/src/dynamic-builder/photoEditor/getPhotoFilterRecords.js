const getPhotoFilterRecords = () => [
  { filterId: 'none', filterLabel: 'Original', cssFilter: '' },
  { filterId: 'grayscale', filterLabel: 'Mono', cssFilter: 'grayscale(1)' },
  { filterId: 'sepia', filterLabel: 'Sepia', cssFilter: 'sepia(0.6)' },
  { filterId: 'warm', filterLabel: 'Warm', cssFilter: 'sepia(0.25) saturate(1.2) hue-rotate(-8deg)' },
  { filterId: 'cool', filterLabel: 'Cool', cssFilter: 'saturate(1.05) hue-rotate(14deg) brightness(1.02)' },
  { filterId: 'vivid', filterLabel: 'Vivid', cssFilter: 'saturate(1.45) contrast(1.08)' },
  { filterId: 'fade', filterLabel: 'Fade', cssFilter: 'contrast(0.85) brightness(1.08) saturate(0.85)' },
  { filterId: 'noir', filterLabel: 'Noir', cssFilter: 'grayscale(1) contrast(1.25) brightness(0.92)' },
];

export default getPhotoFilterRecords;
