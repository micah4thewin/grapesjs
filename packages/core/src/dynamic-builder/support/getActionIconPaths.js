const getActionIconPaths = () => ({
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 5H5v10"/>',
  edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/><path d="m14 6 4 4"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:
    '<path d="m4 4 16 16M9.9 5.2A9.8 9.8 0 0 1 12 5c6 0 10 7 10 7a17.4 17.4 0 0 1-3.3 3.9M6.1 6.1A16.9 16.9 0 0 0 2 12s4 7 10 7a9.9 9.9 0 0 0 4-.8"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  unlock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.7-1.5"/>',
  warning: '<path d="M12 3 2.5 20h19z"/><path d="M12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v6"/>',
  externalLink: '<path d="M14 4h6v6M20 4 11 13M9 6H5v13h13v-4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1.5-1.5"/>',
  upload: '<path d="M12 16V4M8 8l4-4 4 4M5 20h14"/>',
  download: '<path d="M12 3v12M8 11l4 4 4-4M5 20h14"/>',
  file: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/>',
  folder: '<path d="M3 6h6l2 2h10v11H3z"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/>',
  users:
    '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 16c.8-.7 1.8-1 3-1 2.2 0 4 1.8 4 4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  star: '<path d="m12 3 2.2 4.8L19 9l-3.5 3.5.8 5-4.3-2.4-4.3 2.4.8-5L5 9l4.8-1.2z"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
});

export default getActionIconPaths;
