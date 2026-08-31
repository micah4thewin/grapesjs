const getSystemIconPaths = () => ({
  image:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1.5"/><path d="m4 17 5-5 3 3 3-4 5 6"/>',
  gallery:
    '<rect x="3" y="5" width="10" height="8" rx="1"/><rect x="11" y="11" width="10" height="8" rx="1"/><path d="m5 11 2-2 2 2M13 17l2-2 2 2"/>',
  carousel: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="m10 9-3 3 3 3M14 9l3 3-3 3"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
  map: '<path d="m9 4-5 2v14l5-2 6 2 5-2V4l-5 2zM9 4v14M15 6v14"/>',
  assets:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1.5"/><path d="m4 17 5-5 3 3 2-2 6 6"/>',
  imageOptimization:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15l3-3 3 3 2-2 3 3"/><circle cx="9" cy="9" r="1.5"/>',
  dataBinding:
    '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4M8 13l8 4"/>',
  collection:
    '<rect x="5" y="4" width="14" height="4" rx="1"/><rect x="5" y="10" width="14" height="4" rx="1"/><rect x="5" y="16" width="14" height="4" rx="1"/>',
  conditional: '<path d="M5 4h14v16H5zM8 8h8M8 12h3M8 16h6"/><path d="m16 11 2 2-2 2"/>',
  cms: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>',
  code: '<path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12"/>',
  embed: '<path d="M4 5h16v14H4zM8 9h8M8 13h5"/><path d="m16 16 3 3"/>',
  form: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/><path d="m15 16 1 1 2-2"/>',
  analytics: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  cookie:
    '<circle cx="12" cy="12" r="8"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="10" r="1"/><circle cx="11" cy="15" r="1"/>',
  countdown: '<circle cx="12" cy="13" r="7"/><path d="M12 9v4l3 2M9 3h6M12 3v3"/>',
  spacer:
    '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M7 3v2M12 3v2M17 3v2M7 19v2M12 19v2M17 19v2M3 7h2M3 12h2M3 17h2M19 7h2M19 12h2M19 17h2"/>',
  grid: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M10 4v16M16 4v16M4 10h16M4 16h16"/>',
  flex: '<rect x="4" y="5" width="16" height="14" rx="1"/><path d="M8 8v8M12 8v8M16 8v8"/>',
  layout: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10h18M10 10v10"/>',
  spacing: '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>',
  sizing: '<rect x="5" y="5" width="14" height="14" rx="1"/><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5"/>',
  color:
    '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16c2 0 3-1 3-2.2 0-1.2-.8-1.8-.8-2.8 0-1.2 1-2 2.2-2H20"/>',
  gradient: '<path d="M4 20 20 4M5 5h14v14H5z"/>',
  border: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 9h16M4 15h16"/>',
  shadow: '<rect x="5" y="4" width="12" height="12" rx="2"/><path d="M8 20h11v-11"/>',
  background:
    '<rect x="4" y="4" width="16" height="16" rx="1"/><circle cx="9" cy="9" r="2"/><path d="m4 17 5-5 3 3 2-2 6 6"/>',
  effects:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
  tokens: '<path d="M4 4h16v16H4zM8 8h8M8 12h5M8 16h7"/>',
  symbols: '<path d="M8 4h8l4 4v8l-4 4H8l-4-4V8z"/><path d="M9 12h6M12 9v6"/>',
  seo: '<circle cx="10" cy="10" r="6"/><path d="m20 20-5.2-5.2M8 10h4M10 8v4"/>',
  performance: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 12 4-3"/><path d="M4 18h16"/>',
  schema: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/><path d="m16 15 2 2 3-4"/>',
  organization:
    '<rect x="4" y="5" width="16" height="15" rx="1"/><path d="M8 9h2M14 9h2M8 13h2M14 13h2M10 20v-3h4v3"/>',
  webpage: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M4 7h16M8 11h8M8 15h5"/>',
  hosting: '<path d="M7 18a4 4 0 1 1 .6-7.9A5 5 0 0 1 17 12h1a3 3 0 0 1 0 6z"/><path d="M12 8v7M9 12l3 3 3-3"/>',
  domain: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  security: '<path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7z"/><path d="M9 12l2 2 4-4"/>',
  roles: '<path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7z"/><path d="M12 8v4M12 15h.01"/>',
  faq: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.3-.9.9-.9 1.7M12 16h.01"/>',
});

export default getSystemIconPaths;
