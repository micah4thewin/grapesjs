const getPhotoAspectRecords = () => [
  { aspectId: 'free', aspectLabel: 'Free', ratio: 0 },
  { aspectId: 'square', aspectLabel: '1:1', ratio: 1 },
  { aspectId: 'landscape', aspectLabel: '4:3', ratio: 4 / 3 },
  { aspectId: 'photo', aspectLabel: '3:2', ratio: 3 / 2 },
  { aspectId: 'wide', aspectLabel: '16:9', ratio: 16 / 9 },
  { aspectId: 'portrait', aspectLabel: '4:5', ratio: 4 / 5 },
  { aspectId: 'story', aspectLabel: '9:16', ratio: 9 / 16 },
];

export default getPhotoAspectRecords;
