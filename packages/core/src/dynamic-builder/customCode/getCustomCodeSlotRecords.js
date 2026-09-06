const getCustomCodeSlotRecords = () => [
  {
    name: 'headHtml',
    label: 'Head',
    language: 'html',
    helpText: 'Injected before the closing head tag on every exported page.',
  },
  {
    name: 'bodyStartHtml',
    label: 'Body start',
    language: 'html',
    helpText: 'Injected right after the opening body tag on every exported page.',
  },
  {
    name: 'bodyEndHtml',
    label: 'Body end',
    language: 'html',
    helpText: 'Injected right before the closing body tag on every exported page.',
  },
];

export default getCustomCodeSlotRecords;
