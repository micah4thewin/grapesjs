const getMediaLibraryIconPaths = () => ({
  camera:
    '<path d="M3 8h3l2-3h8l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/>',
  cameraVideo: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M9 22h6"/>',
  micOff:
    '<path d="M9 9v2a3 3 0 0 0 4.7 2.5M15 11V5a3 3 0 0 0-5.9-.7"/><path d="M5 11a7 7 0 0 0 10.5 6M19 11a7 7 0 0 1-.6 2.8M12 18v4M9 22h6M3 3l18 18"/>',
  headphones:
    '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  film: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5"/>',
  clapper:
    '<path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m3 8 1.5-4 17 1L20 8"/><path d="m8 4 2 4M13 4.5l2 4"/>',
  speaker: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="15" r="3.5"/><path d="M12 7h.01"/>',
  podcast:
    '<circle cx="12" cy="9" r="3"/><path d="M8 5a6 6 0 0 1 8 0M5 2.5a10 10 0 0 1 14 0"/><path d="M10 15h4l-1 7h-2z"/>',
  radio:
    '<circle cx="12" cy="12" r="2"/><path d="M7.5 7.5a6.5 6.5 0 0 0 0 9M16.5 7.5a6.5 6.5 0 0 1 0 9"/><path d="M4.5 4.5a11 11 0 0 0 0 15M19.5 4.5a11 11 0 0 1 0 15"/>',
  playCircle: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
  pauseCircle: '<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
  stopCircle: '<circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
  skipBack: '<path d="M19 5 9 12l10 7z"/><path d="M5 5v14"/>',
  skipForward: '<path d="M5 5l10 7-10 7z"/><path d="M19 5v14"/>',
  shuffle: '<path d="M16 3h5v5"/><path d="M3 21 21 3"/><path d="M16 21h5v-5"/><path d="m3 3 6 6M15 15l6 6"/>',
  repeatTrack:
    '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
  broadcast:
    '<circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"/><path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13"/>',
  subtitles: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 14h4M13 14h5"/>',
  aperture:
    '<circle cx="12" cy="12" r="9"/><path d="m12 3 4.5 7.8M21 12h-9M16.5 19.8 12 12M3 12h9M7.5 4.2 12 12M7.5 19.8 12 12"/>',
  imageStack:
    '<rect x="7" y="3" width="14" height="14" rx="2"/><path d="M17 21H5a2 2 0 0 1-2-2V7"/><circle cx="11.5" cy="7.5" r="1.5"/><path d="m7 14 3.5-3.5L21 21"/>',
});

export default getMediaLibraryIconPaths;
