const getFoodIconPaths = () => ({
  coffee:
    '<path d="M3 8h14v6a5 5 0 0 1-10 0z" transform="translate(0 0)"/><path d="M17 9h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M3 21h16"/>',
  cupHot:
    '<path d="M4 9h13v5a5 5 0 0 1-10 0z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 5c0-1 1-1.5 1-2.5M12 5c0-1 1-1.5 1-2.5"/>',
  utensils: '<path d="M6 3v8a2 2 0 0 0 4 0V3"/><path d="M8 11v10M16 3c-1.5 1.5-2 3.5-2 6s1 3 2 3v9"/>',
  pizza:
    '<path d="M12 3 3 20l18-1z"/><circle cx="11" cy="12" r="1"/><circle cx="14" cy="16" r="1"/><circle cx="9" cy="17" r="1"/>',
  burger: '<path d="M4 9a8 8 0 0 1 16 0z"/><path d="M4 12h16M4 15h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>',
  iceCream: '<path d="M8 10a4 4 0 1 1 8 0z"/><path d="m8 11 4 10 4-10z"/>',
  cake: '<path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7z"/><path d="M4 16c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M12 8V5M9 8V6M15 8V6"/>',
  wine: '<path d="M8 3h8l-1 7a3 3 0 0 1-6 0z"/><path d="M12 13v6M9 21h6"/>',
  beer: '<path d="M5 6h11v14H5z"/><path d="M16 9h3v7h-3"/><path d="M8 10v6M12 10v6"/>',
  bread: '<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M8 10v10"/>',
  apple:
    '<path d="M12 8c-3-2-8-1-8 5 0 4 3 8 5 8 1.5 0 2-1 3-1s1.5 1 3 1c2 0 5-4 5-8 0-6-5-7-8-5z"/><path d="M12 8V5a3 3 0 0 1 3-3"/>',
  carrot:
    '<path d="m3 21 10-10 4 4z" transform="translate(0 -2)"/><path d="M13 9c1-3 4-5 7-4-1 3-3 5-6 5"/><path d="M13 9c-1-2.5-.5-5 1-6.5"/>',
  egg: '<path d="M12 3c4 0 7 6 7 10a7 7 0 0 1-14 0c0-4 3-10 7-10z"/>',
  fish: '<path d="M3 12c3-5 8-6 12-4l6-3-2 7 2 7-6-3c-4 2-9 1-12-4z"/><circle cx="16" cy="11" r="1"/>',
  salad: '<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M12 8V5M9 21h6"/>',
  cookieBiscuit:
    '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1"/><circle cx="14" cy="9" r="1"/><circle cx="13" cy="15" r="1"/><circle cx="8.5" cy="15" r="1"/>',
  bottle: '<path d="M10 3h4v3l2 3v12H8V9l2-3z"/><path d="M8 13h8"/>',
  chefHat: '<path d="M6 21h12v-6H6z"/><path d="M6 15a4 4 0 0 1-1-7.8A4 4 0 0 1 12 5a4 4 0 0 1 7 2.2A4 4 0 0 1 18 15"/>',
  restaurant:
    '<path d="M7 3v7M4 3v4a3 3 0 0 0 6 0V3M7 10v11"/><path d="M17 3c-2 2-2.5 4.5-2.5 7h5C19.5 7.5 19 5 17 3zM17 10v11"/>',
  teapot:
    '<path d="M5 10h12v5a5 5 0 0 1-10 0z"/><path d="M17 12h2a2 2 0 0 1 0 4"/><path d="M5 12 2 9"/><path d="M9 10V8a2 2 0 0 1 4 0v2"/><path d="M6 21h12"/>',
  grocery: '<path d="M3 6h3l2.5 10h9L20 9H7"/><circle cx="10" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/>',
  menuBook: '<path d="M4 4h7v16H4z"/><path d="M13 4h7v16h-7z"/><path d="M6 8h3M6 11h3M15 8h3M15 11h3"/>',
});

export default getFoodIconPaths;
