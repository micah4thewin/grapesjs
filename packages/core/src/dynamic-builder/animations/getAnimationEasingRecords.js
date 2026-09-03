const getAnimationEasingRecords = () => [
  { id: 'ease-out', label: 'Ease out', value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { id: 'ease-in-out', label: 'Ease in and out', value: 'cubic-bezier(0.65, 0, 0.35, 1)' },
  { id: 'linear', label: 'Steady', value: 'linear' },
  { id: 'spring', label: 'Springy', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
];

export default getAnimationEasingRecords;
