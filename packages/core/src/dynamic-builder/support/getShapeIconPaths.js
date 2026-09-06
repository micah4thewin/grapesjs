const getShapeIconPaths = () => ({
  circleShape: '<circle cx="12" cy="12" r="9"/>',
  squareShape: '<rect x="3" y="3" width="18" height="18" rx="2"/>',
  triangleShape: '<path d="m12 4 9 16H3z"/>',
  hexagonShape: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',
  pentagonShape: '<path d="m12 3 9 6.5-3.5 10.5h-11L3 9.5z"/>',
  diamondShape: '<path d="m12 3 9 9-9 9-9-9z"/>',
  octagonShape: '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/>',
  starOutline: '<path d="m12 3 2.8 6 6.2.7-4.6 4.3 1.3 6-5.7-3.2L6.3 20l1.3-6L3 9.7 9.2 9z"/>',
  plusCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  minusCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  xCircle: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
  questionCircle:
    '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.3M12 17h.01"/>',
  alertCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h.01"/>',
  dot: '<circle cx="12" cy="12" r="3.5"/>',
  sparkle:
    '<path d="M12 3c.8 4.2 4 7.4 8.2 8.2C16 12 12.8 15.2 12 19.4 11.2 15.2 8 12 3.8 11.2 8 10.4 11.2 7.2 12 3z"/>',
  sparkles:
    '<path d="M11 4c.6 3 2.9 5.3 6 6-3 .6-5.4 3-6 6-.6-3-3-5.4-6-6 3-.7 5.4-3 6-6z"/><path d="M18 14c.3 1.4 1.4 2.4 2.8 2.7-1.4.3-2.5 1.4-2.8 2.8-.3-1.4-1.4-2.5-2.8-2.8 1.4-.3 2.5-1.3 2.8-2.7z"/>',
  badgeCheck:
    '<path d="m12 2 2.4 2.1 3.2-.3.6 3.1 2.7 1.7-1.5 2.9 1.5 2.9-2.7 1.7-.6 3.1-3.2-.3L12 21l-2.4-2.1-3.2.3-.6-3.1L3.1 14l1.5-2.9L3.1 8.2l2.7-1.7.6-3.1 3.2.3z"/><path d="m9 12 2 2 4-4.5"/>',
  shieldCheck: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  flagShape: '<path d="M5 21V4h11l-1.5 4L16 12H5"/>',
  crown: '<path d="m3 8 4 3 5-6 5 6 4-3-2 12H5z"/><path d="M5 20h14"/>',
  infinity: '<path d="M8 12a4 4 0 1 1 4 0 4 4 0 1 0 4 0 4 4 0 1 1-4 0 4 4 0 1 0-4 0z"/>',
  quoteMark:
    '<path d="M9 6c-3 1-5 3.5-5 7v5h6v-6H6c0-2 1.5-3.5 3-4z"/><path d="M20 6c-3 1-5 3.5-5 7v5h6v-6h-4c0-2 1.5-3.5 3-4z"/>',
});

export default getShapeIconPaths;
