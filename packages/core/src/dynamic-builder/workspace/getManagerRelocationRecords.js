const getManagerRelocationRecords = () => [
  { zoneKey: 'blocks', markerSelector: '.gjs-blocks-cs', commandId: 'core:open-blocks' },
  { zoneKey: 'layers', markerSelector: '.gjs-layer', commandId: 'core:open-layers' },
  { zoneKey: 'settings', markerSelector: '.gjs-traits-cs', commandId: 'core:open-traits' },
  { zoneKey: 'style', markerSelector: '.gjs-sm-sectors', commandId: 'core:open-styles' },
];

export default getManagerRelocationRecords;
