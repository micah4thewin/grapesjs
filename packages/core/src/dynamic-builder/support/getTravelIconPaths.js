const getTravelIconPaths = () => ({
  plane:
    '<path d="M10 3.5a1.5 1.5 0 0 1 3 0V9l8 4.5v2l-8-2.2V19l2.5 2v1.5L11.5 21 7.5 22.5V21l2.5-2v-5.7L2 15.5v-2L10 9z"/>',
  car: '<path d="M4 15h16v4h-3v-2H7v2H4z"/><path d="m5 15 2-6h10l2 6"/><circle cx="7.5" cy="17" r="1"/><circle cx="16.5" cy="17" r="1"/>',
  bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
  train:
    '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M9 20l-2 2M15 20l2 2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>',
  bike: '<circle cx="6" cy="17" r="3.5"/><circle cx="18" cy="17" r="3.5"/><path d="M6 17 10 8h4l4 9M9 8h5M14 8l-3 9"/>',
  ship: '<path d="M3 17h18l-2 4H5z"/><path d="M5 17V9h14v8"/><path d="M9 9V5h6v4M12 5V3"/>',
  rocket:
    '<path d="M12 2c3.5 2 5.5 6 5.5 10.5L12 18l-5.5-5.5C6.5 8 8.5 4 12 2z"/><circle cx="12" cy="10" r="2"/><path d="M8 17c-1.5 1-2 3-2 5 2 0 4-.5 5-2M16 17c1.5 1 2 3 2 5-2 0-4-.5-5-2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z"/>',
  luggage: '<rect x="5" y="7" width="14" height="13" rx="2"/><path d="M9 7V4h6v3M10 20v2M14 20v2M12 11v5"/>',
  passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
  hotel: '<path d="M3 21V6h18v15"/><path d="M7 10h3M14 10h3M7 14h3M14 14h3M10 21v-4h4v4"/>',
  tent: '<path d="m12 4 9 16H3z"/><path d="M12 4v16M12 20l4-7M12 20l-4-7"/>',
  anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14"/><path d="M5 12H3a9 9 0 0 0 18 0h-2M8 11h8"/>',
  fuel: '<rect x="4" y="3" width="10" height="18" rx="2"/><path d="M4 11h10"/><path d="M14 8h3l2 2v8a1.5 1.5 0 0 1-3 0v-5h-2"/>',
  parking: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M10 17V8h3.5a2.5 2.5 0 0 1 0 5H10"/>',
  taxi: '<path d="M4 15h16v4h-3v-2H7v2H4z"/><path d="m5 15 2-6h10l2 6"/><path d="M9 6h6V4H9z"/><circle cx="7.5" cy="17" r="1"/><circle cx="16.5" cy="17" r="1"/>',
  helicopter:
    '<path d="M4 4h16M12 4v3"/><path d="M6 11h9l5 3v3H8a4 4 0 0 1-4-4v-2z"/><path d="M8 17v3M20 14v6M16 20h6"/>',
  routeMap:
    '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h5a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8"/>',
  suitcase:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  beach: '<path d="M12 21V9"/><path d="M12 9a9 9 0 0 1 9 3c-3-4-8-6-13-4a9 9 0 0 1 4 1z"/><path d="M3 21h18"/>',
  landmark: '<path d="M3 21h18M4 10h16M5 10v11M19 10v11M9 10v11M15 10v11"/><path d="m12 3 8 5H4z"/>',
  ticketPlane: '<path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z"/><path d="m10 10 4 4M14 10l-4 4"/>',
});

export default getTravelIconPaths;
