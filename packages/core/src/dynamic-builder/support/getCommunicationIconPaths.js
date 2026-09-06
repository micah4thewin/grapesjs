const getCommunicationIconPaths = () => ({
  mail: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  mailOpen: '<path d="M3 10 12 4l9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m3 10 9 6 9-6"/>',
  message: '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/>',
  messageDots:
    '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/><path d="M9 12h.01M12 12h.01M15 12h.01"/>',
  chat: '<path d="M17 15h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1"/><path d="M15 9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v3l4-3h5a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"/>',
  phone: '<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z"/>',
  phoneCall:
    '<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z"/><path d="M15 4a5 5 0 0 1 5 5"/>',
  send: '<path d="M21 3 3 10.5l7 3 3 7z"/><path d="m10 13.5 4-4"/>',
  bell: '<path d="M18 15V10a6 6 0 0 0-12 0v5l-2 3h16z"/><path d="M10 21h4"/>',
  bellOff: '<path d="M18 15V10a6 6 0 0 0-8.5-5.5M6 8v7l-2 3h13"/><path d="M10 21h4M3 3l18 18"/>',
  inbox: '<path d="M4 13h4l2 3h4l2-3h4"/><path d="M5 5h14l2 8v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
  share:
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  reply: '<path d="M9 7 4 12l5 5"/><path d="M4 12h9a7 7 0 0 1 7 7v1"/>',
  forwardArrow: '<path d="m15 7 5 5-5 5"/><path d="M20 12h-9a7 7 0 0 0-7 7v1"/>',
  voicemail: '<circle cx="6" cy="13" r="4"/><circle cx="18" cy="13" r="4"/><path d="M6 17h12"/>',
  headset:
    '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/><path d="M20 21h-5"/>',
  contactCard:
    '<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5 17a4 4 0 0 1 8 0M16 9h4M16 13h4"/>',
  rss: '<path d="M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M5 12a7 7 0 0 1 7 7M5 5a14 14 0 0 1 14 14"/>',
  wifi: '<path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0"/><path d="M12 19h.01"/>',
  megaphoneCall: '<path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6l-7 4H4a1 1 0 0 0-1 1z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
  thumbsUp:
    '<path d="M7 21V10l5-7a2 2 0 0 1 2 2v5h5a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 17.6 21z"/><path d="M7 10H3v11h4"/>',
  thumbsDown:
    '<path d="M17 3v11l-5 7a2 2 0 0 1-2-2v-5H5a2 2 0 0 1-2-2.4l1.4-7A2 2 0 0 1 6.4 3z"/><path d="M17 14h4V3h-4"/>',
  translate:
    '<path d="M4 6h10M9 4v2c0 4-2 7-5 9"/><path d="M6 11c1.5 2.5 4 4.5 7 5.5"/><path d="m13 21 4-9 4 9M14.5 18h5"/>',
});

export default getCommunicationIconPaths;
