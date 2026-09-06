const getHealthIconPaths = () => ({
  heart: '<path d="M12 20s-7.5-4.7-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.3-7.5 10-7.5 10z"/>',
  heartPulse:
    '<path d="M12 20s-7.5-4.7-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.3-7.5 10-7.5 10z"/><path d="M3 12h4l2-3 2 6 2-4 1.5 1H21"/>',
  stethoscope:
    '<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3H3M13 3h2"/><path d="M9 12v3a5 5 0 0 0 10 0v-1"/><circle cx="19" cy="12" r="2"/>',
  pill: '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)"/><path d="m9 9 6 6"/>',
  syringe: '<path d="m14 4 6 6M17 7l-9 9-4 1 1-4 9-9z" transform="translate(0 0)"/><path d="m12 9 3 3M9 12l3 3"/>',
  bandage:
    '<rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-30 12 12)"/><path d="M10 10h.01M14 14h.01M10 14h.01M14 10h.01"/>',
  firstAid: '<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M8 6V4h8v2M12 10v6M9 13h6"/>',
  dna: '<path d="M4 3c0 6 16 6 16 12M20 3c0 6-16 6-16 12M4 21c0-2 16-2 16-6"/><path d="M7 6h10M8 10h8M8 15h8"/>',
  brain:
    '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 4V3z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 4V3z"/>',
  tooth:
    '<path d="M7 3c1.5 0 2 1 5 1s3.5-1 5-1a3 3 0 0 1 3 3c0 3-1.5 4-2 8-.4 3-1 6-2.5 6S13 17 12 17s-2 3-3.5 3S6 17 5.5 14C5 10 4 9 4 6a3 3 0 0 1 3-3z"/>',
  dumbbell: '<path d="M3 9v6M6 7v10M18 7v10M21 9v6"/><path d="M6 12h12"/>',
  run: '<circle cx="15" cy="4" r="2"/><path d="m9 21 2-6-3-3 1-5 4 2 3 3"/><path d="m6 12 3-1M14 15l2 6"/>',
  scale: '<path d="M12 3v18"/><path d="M3 8h18"/><path d="M6 8 3 15h6zM18 8l-3 7h6z"/>',
  sleep: '<path d="M21 13a8.5 8.5 0 0 1-10-10 8.5 8.5 0 1 0 10 10z"/><path d="M14 4h4l-4 4h4"/>',
  virus:
    '<circle cx="12" cy="12" r="5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  mask: '<path d="M4 9c3-1 5-2 8-2s5 1 8 2v3a8 8 0 0 1-16 0z"/><path d="M4 10 2 9v4l2-1M20 10l2-1v4l-2-1M8 12h8"/>',
  wheelchair: '<circle cx="11" cy="18" r="5"/><circle cx="13" cy="4" r="2"/><path d="M13 8v6h5l2 6"/>',
  hospital: '<path d="M4 21V7h16v14"/><path d="M12 7V3M9 5h6"/><path d="M12 11v6M9 14h6"/>',
  medicalCross: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
  meditation: '<circle cx="12" cy="5" r="2"/><path d="M12 9v5M8 21c0-3 1.5-5 4-5s4 2 4 5"/><path d="M4 15h5M15 15h5"/>',
  vaccine: '<path d="M12 3v6M9 9h6v5a3 3 0 0 1-6 0z"/><path d="M9 12h6M12 17v4M10 21h4"/>',
});

export default getHealthIconPaths;
