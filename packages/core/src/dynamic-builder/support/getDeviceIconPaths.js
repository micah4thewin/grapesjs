const getDeviceIconPaths = () => ({
  printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 15h12v6H6z"/>',
  server:
    '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>',
  database:
    '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  hardDrive:
    '<rect x="2" y="12" width="20" height="8" rx="2"/><path d="m5 12 2-7h10l2 7"/><path d="M6.5 16h.01M10 16h.01"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  monitor: '<rect x="2" y="4" width="20" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  watch:
    '<circle cx="12" cy="12" r="6"/><path d="M9 6.5 9.5 2h5l.5 4.5M9 17.5l.5 4.5h5l.5-4.5"/><path d="M12 10v2.5l1.5 1"/>',
  gamepad:
    '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r="1"/><circle cx="18.5" cy="14" r="1"/>',
  router:
    '<rect x="2" y="13" width="20" height="7" rx="2"/><path d="M6 16.5h.01M10 16.5h.01"/><path d="M12 10V6M9 8a4 4 0 0 1 6 0M6.5 5.5a8 8 0 0 1 11 0"/>',
  usb: '<circle cx="12" cy="19" r="2"/><path d="M12 17V5"/><path d="m9 8 3-5 3 5"/><path d="M12 12h4v-2M12 14H8v-3"/>',
  sdCard: '<path d="M6 3h9l4 4v14H6z"/><path d="M10 3v4M13 3v4M16 5v2"/>',
  satellite:
    '<path d="m9 9-6 6 3 3 6-6"/><path d="m13 5 6 6-3 3-6-6z"/><path d="M15 3a6 6 0 0 1 6 6M15 7a2 2 0 0 1 2 2"/>',
  robot:
    '<rect x="4" y="8" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1.3"/><circle cx="15" cy="13" r="1.3"/><path d="M12 4v4M9 17h6M2 12v3M22 12v3"/><circle cx="12" cy="3" r="1.5"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3M12 15h5"/>',
  mouse: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v3"/>',
  webcam: '<circle cx="12" cy="10" r="6"/><circle cx="12" cy="10" r="2"/><path d="M8 21h8l-1-3H9z"/>',
  projector:
    '<rect x="2" y="8" width="20" height="10" rx="2"/><circle cx="9" cy="13" r="3"/><path d="M17 11h.01M17 15h.01M6 18v2M18 18v2"/>',
  smartHome: '<path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 14a4 4 0 0 1 6 0M11 17h2"/>',
  chip: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
  simCard: '<path d="M6 3h8l5 5v13H6z"/><rect x="9" y="12" width="7" height="6" rx="1"/><path d="M12 12v6M9 15h7"/>',
  qrScan:
    '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M3 12h18"/>',
  cast: '<path d="M2 18a4 4 0 0 1 4 4M2 14a8 8 0 0 1 8 8M2 10a12 12 0 0 1 12 12"/><path d="M2 8V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
});

export default getDeviceIconPaths;
