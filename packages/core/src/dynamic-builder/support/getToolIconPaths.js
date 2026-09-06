const getToolIconPaths = () => ({
  wrench: '<path d="M15 3a5 5 0 0 0-4.6 7L3 17.4 6.6 21l7.4-7.4A5 5 0 0 0 21 9l-3 3-3-3 3-3a5 5 0 0 0-3-3z"/>',
  hammer: '<path d="m3 21 8-8"/><path d="m12 9 3-3 2 2 4-4-3-3-4 4-2-2-3 3z"/>',
  screwdriver: '<path d="m4 20 7-7"/><path d="m10 14-2-2 7-7 3 1 1 3z"/><path d="m18 3 3 3"/>',
  toolbox: '<rect x="2" y="8" width="20" height="12" rx="2"/><path d="M8 8V5h8v3M2 13h20M10 13v2h4v-2"/>',
  paintRoller:
    '<rect x="3" y="4" width="12" height="5" rx="1"/><path d="M15 6.5h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-6v3"/><rect x="10" y="15" width="4" height="6" rx="1"/>',
  brush: '<path d="M4 20c0-2 1-3 3-3s3 1 3 3-1 2-3 2H4z"/><path d="m10 17 9-9a2.8 2.8 0 0 0-4-4l-9 9"/>',
  palette:
    '<path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.2h2A4 4 0 0 0 21 10c-.5-4-4.4-7-9-7z"/><circle cx="7.5" cy="12" r="1"/><circle cx="9.5" cy="8" r="1"/><circle cx="14" cy="7.5" r="1"/>',
  scissors: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="m8 8 12 10M20 6 8 16"/>',
  magnet: '<path d="M6 3v9a6 6 0 0 0 12 0V3h-4v9a2 2 0 0 1-4 0V3z"/><path d="M6 7h4M14 7h4"/>',
  battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M21 10v4"/><path d="M6 11v2M10 11v2"/>',
  plug: '<path d="M9 3v6M15 3v6"/><path d="M7 9h10v3a5 5 0 0 1-10 0z"/><path d="M12 17v4"/>',
  key: '<circle cx="7" cy="14" r="4"/><path d="m10 11 9-9 3 3-2 2-2-2-2 2 2 2-3 3-2-2z"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/>',
  bug: '<rect x="8" y="7" width="8" height="13" rx="4"/><path d="M8 12H4M20 12h-4M8 16l-3 2M16 16l3 2M8 9 5 7M16 9l3-2"/><path d="M9 6a3 3 0 0 1 6 0"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  wand: '<path d="m4 20 12-12"/><path d="m14 6 4 4"/><path d="M18 3v3M21 6h-3M6 3v2M5 4h2M19 15v2M18 16h2"/>',
  gauge: '<path d="M3 16a9 9 0 1 1 18 0"/><path d="m12 16 4-5"/><circle cx="12" cy="16" r="1.5"/>',
  toggle: '<rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="8" cy="12" r="3"/>',
  clipboardCheck: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 13 2 2 4-4"/>',
  pipette: '<path d="m3 21 1-4 9-9 3 3-9 9z"/><path d="m14 5 2-2a2.8 2.8 0 0 1 4 4l-2 2z"/><path d="m12 7 5 5"/>',
  hardHat: '<path d="M4 16a8 8 0 0 1 16 0z"/><path d="M2 16h20v3H2z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
});

export default getToolIconPaths;
