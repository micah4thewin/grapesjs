const getEducationIconPaths = () => ({
  book: '<path d="M5 4a2 2 0 0 1 2-2h12v18H7a2 2 0 0 0-2 2z"/><path d="M5 18h14"/>',
  bookOpen:
    '<path d="M12 6c-2-1.5-4.5-2-8-2v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4c-3.5 0-6 .5-8 2z"/><path d="M12 6v14"/>',
  graduationCap:
    '<path d="m12 4 10 5-10 5L2 9z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M21 9.5V15"/>',
  pencilRuler: '<path d="M3 17 14 6l4 4L7 21H3z"/><path d="m14 6 3-3 4 4-3 3"/><path d="m9 11 4 4"/>',
  ruler:
    '<rect x="2" y="8" width="20" height="8" rx="2" transform="rotate(-45 12 12)"/><path d="M8 8.5 9.5 10M11 5.5 12.5 7M14 2.5 15.5 4"/>',
  calculator:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8v3H8z"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>',
  microscope:
    '<path d="M9 3h4v7H9z"/><path d="M11 10a5 5 0 0 1 5 5c0 2-1 3-2 4"/><path d="M5 21h14M7 21c0-3 2-5 5-5"/><path d="M8 6H6"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 15h8"/>',
  atom: '<circle cx="12" cy="12" r="2"/><path d="M12 3c5 5 8 12 6 14s-9-1-14-6"/><path d="M12 21c-5-5-8-12-6-14s9 1 14 6"/>',
  backpack: '<path d="M6 8a6 6 0 0 1 12 0v13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M9 14h6v4H9z"/>',
  certificate:
    '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M7 7h10M7 11h5"/><circle cx="16" cy="17" r="3"/><path d="m14 19-1 4 3-1.5 3 1.5-1-4"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m9 14-2 8 5-3 5 3-2-8"/>',
  medal: '<path d="m8 3 4 8 4-8"/><path d="M6 3h12"/><circle cx="12" cy="16" r="5"/><path d="m11 14 1-1v4"/>',
  trophy:
    '<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3"/><path d="M12 14v4M9 21h6M10 18h4"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h4"/>',
  notebook: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18"/><path d="M12 8h4M12 12h4"/>',
  presentation: '<path d="M3 4h18v11H3z"/><path d="M12 15v4M9 21l3-2 3 2M12 3V2"/><path d="m7 12 3-3 2 2 4-4"/>',
  chalkboard: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M7 21h10M12 17v4"/><path d="M6 9h8M6 12h5"/>',
  lightbulb: '<path d="M9 17a5 5 0 1 1 6 0v2H9z"/><path d="M10 21h4"/>',
  abc: '<path d="M2 16 4.5 8 7 16M3 13.5h3"/><path d="M10 8h2.5a2 2 0 0 1 0 4H10zM10 12h3a2 2 0 0 1 0 4h-3z"/><path d="M22 10a3 3 0 0 0-4 1.5 4 4 0 0 0 0 1 3 3 0 0 0 4 1.5"/>',
  puzzle:
    '<path d="M10 3h4v2a2 2 0 1 0 4 0V3h3v4h-2a2 2 0 1 0 0 4h2v10H14v-2a2 2 0 1 0-4 0v2H3V11h2a2 2 0 1 0 0-4H3V3h7z"/>',
  studentDesk: '<path d="M3 9h18M5 9v12M19 9v12"/><path d="m12 3 8 6H4z"/><path d="M8 15h8"/>',
});

export default getEducationIconPaths;
