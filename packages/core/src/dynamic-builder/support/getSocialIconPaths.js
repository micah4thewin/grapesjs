const getSocialIconPaths = () => ({
  facebook: '<path d="M14 9V7.5a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A4.5 4.5 0 0 0 10 7.5V9H8v3h2v9h4v-9h2.5l.5-3z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11v6M8 8h.01"/><path d="M12 17v-6M12 13a2 2 0 0 1 4 0v4"/>',
  youtube: '<rect x="2" y="6" width="20" height="12" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
  twitterX: '<path d="m4 4 16 16M20 4 4 20"/>',
  tiktok:
    '<path d="M15 3c.5 2.5 2 4 4.5 4.3v3.2c-1.7 0-3.3-.5-4.5-1.4v5.4a6.5 6.5 0 1 1-6.5-6.5c.4 0 .7 0 1 .1v3.3a3.2 3.2 0 1 0 2.2 3V3z"/>',
  whatsapp:
    '<path d="M3 21l1.6-4.4A8.4 8.4 0 1 1 8 20.2z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-.9 1a5 5 0 0 1-2-2l1-.9-1-2z"/>',
  pinterest:
    '<circle cx="12" cy="12" r="9"/><path d="M9.5 20c-.5-1.6 0-3.4.5-5l1-4M9 10a3 3 0 1 1 4.5 2.8c-1.5.8-3-.2-3-.2"/>',
  telegram: '<path d="M21 4 3 11l5 2 2 6 2.5-3.5L18 19z"/><path d="m8 13 10-7-6 9"/>',
  discord:
    '<path d="M8 6a14 14 0 0 1 8 0l2 2c1.5 3 2 6 1.5 9l-3 2-1.5-2M8 6 6 8c-1.5 3-2 6-1.5 9l3 2 1.5-2"/><circle cx="9.5" cy="13" r="1.2"/><circle cx="14.5" cy="13" r="1.2"/>',
  reddit:
    '<circle cx="12" cy="13" r="7"/><circle cx="19" cy="6" r="2"/><path d="M12 6V4l5 1"/><path d="M9.5 13h.01M14.5 13h.01M9.5 16a4 4 0 0 0 5 0"/>',
  twitch: '<path d="M4 3h16v11l-4 4h-3l-3 3H8v-3H4z"/><path d="M11 8v4M15 8v4"/>',
  snapchat:
    '<path d="M12 3a5 5 0 0 1 5 5v3l3 1.5-2.5 1.5.5 2-3 .5-1 2-2-1-2 1-1-2-3-.5.5-2L4 12.5 7 11V8a5 5 0 0 1 5-5z"/>',
  threads:
    '<path d="M16 8c-1-1.5-2.5-2-4-2-3 0-5 2.5-5 6s2 6 5 6c2.5 0 4-1.5 4-3s-1.5-2.5-3.5-2.5c-1.2 0-2 .5-2 1.3"/>',
  medium:
    '<circle cx="7" cy="12" r="4"/><ellipse cx="15" cy="12" rx="2" ry="4"/><ellipse cx="20" cy="12" rx="1" ry="4"/>',
  github:
    '<path d="M9 20c-4 1.2-4-2-6-2.5"/><path d="M15 21v-3.2c0-1 .2-1.6-.4-2.2 2.6-.3 5.4-1.3 5.4-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.9 5.6 3.2 5.6 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.6c0 4.7 2.8 5.7 5.4 6-.4.4-.5.9-.5 1.4V21"/>',
  dribbble:
    '<circle cx="12" cy="12" r="9"/><path d="M5 8c5 0 10 1 14 5M8.5 3.5C12 7 14 12 15 20.5M3.5 15c4-3 9-4 14-2"/>',
  behance:
    '<path d="M2 6h5.5a2.5 2.5 0 0 1 0 5H2zM2 11h6a2.5 2.5 0 0 1 0 5H2z"/><path d="M14 13h7a3.5 3.5 0 0 0-7 0 3.5 3.5 0 0 0 6.3 2.1"/><path d="M15 7h5"/>',
  slack:
    '<rect x="10" y="2" width="4" height="9" rx="2"/><rect x="10" y="13" width="4" height="9" rx="2"/><rect x="2" y="10" width="9" height="4" rx="2"/><rect x="13" y="10" width="9" height="4" rx="2"/>',
  mastodon:
    '<path d="M6 15c4 1 8 1 12 0M18 15c1-2 1-5 .8-7.4C18.5 5 16 4 12 4S5.5 5 5.2 7.6C5 10 5 13 6 15"/><path d="M9 19c2 1 5 1 7 0"/><path d="M9 12V9.5a1.5 1.5 0 0 1 3 0V12M12 9.5a1.5 1.5 0 0 1 3 0V12"/>',
});

export default getSocialIconPaths;
