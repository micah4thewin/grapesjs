const getCommerceIconPaths = () => ({
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 11.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"/>',
  bag: '<path d="M5 8h14l1 12H4z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  creditCard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4zM12 8s1.5-4 3.5-4a2 2 0 0 1 0 4z"/>',
  receipt: '<path d="M5 3h14v18l-2.3-1.5-2.4 1.5-2.3-1.5L9.7 21l-2.4-1.5L5 21z"/><path d="M9 8h6M9 12h6"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h12v4"/><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M17 13h.01"/>',
  truck:
    '<rect x="1" y="6" width="13" height="10" rx="1"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  packageBox: '<path d="M12 3 3 7.5v9L12 21l9-4.5v-9z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/>',
  store: '<path d="M3 9h18l-1-5H4z"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
  coins:
    '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M15 12.5c2.9-.3 6-1.5 6-3.5"/><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/>',
  dollar:
    '<path d="M12 2v20"/><path d="M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 3 5 3.5 5 1.6 5 3.5-2.2 3-5 3-5-1.1-5-3"/>',
  euro: '<path d="M18 6a7 7 0 1 0 0 12"/><path d="M4 10h9M4 14h9"/>',
  pound: '<path d="M8 21h11"/><path d="M8 21v-8a5 5 0 1 1 8-4"/><path d="M6 13h8"/>',
  percent: '<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M19 5 5 19"/>',
  barcode: '<path d="M3 5v14M6 5v14M9 5v10M12 5v14M15 5v10M18 5v14M21 5v14"/>',
  qrCode:
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3M14 20h7"/>',
  ticket:
    '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12"/>',
  refund: '<path d="M3 9a9 9 0 1 1 1 5"/><path d="M3 4v5h5"/><path d="M12 8v5l3 2"/>',
  discount: '<circle cx="12" cy="12" r="9"/><path d="m9 15 6-6"/><path d="M9.5 9.5h.01M14.5 14.5h.01"/>',
  invoiceDoc: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/><path d="M9 12h6M9 16h4"/>',
  shippingFast:
    '<path d="M12 6h6l3 4v6h-9z"/><circle cx="8" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M2 8h7M1 12h6M3 16h3"/>',
  wishlist: '<path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"/>',
  subscription: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 14h3M15 14h1"/>',
});

export default getCommerceIconPaths;
