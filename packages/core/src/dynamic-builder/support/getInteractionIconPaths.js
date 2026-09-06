const getInteractionIconPaths = () => ({
  flow: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M6 8.5v5a4 4 0 0 0 4 4h5.5"/>',
  trigger: '<path d="M13 3 5 13h5l-1 8 8-10h-5z"/>',
  motion: '<path d="M4 12h6M4 7h9M4 17h4"/><path d="m14 8 5 4-5 4z"/>',
  dialog:
    '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 20l3-3"/><path d="M12 8v3"/><circle cx="12" cy="14" r="0.6"/>',
  cursorClick: '<path d="m8 4 9 8-4 1 2.5 5-2.5 1-2.5-5L8 17z"/><path d="M4 4h1M4 8h1M8 4v1"/>',
  pointerHover: '<path d="m9 5 7 6-3.5.8 2 4.2-2.2 1-2-4.2L8 16z"/><path d="M17 4h3M18.5 2.5v3"/>',
  pageLoad: '<path d="M4 5h16v14H4z"/><path d="M12 9v5"/><path d="m9.5 11.5 2.5 2.5 2.5-2.5"/>',
});

export default getInteractionIconPaths;
