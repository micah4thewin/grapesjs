const buildDeviceVisibilityCss = () =>
  [
    '@media (min-width: 992px) { .db-hide-desktop { display: none !important; } }',
    '@media (min-width: 768px) and (max-width: 991.98px) { .db-hide-tablet { display: none !important; } }',
    '@media (max-width: 767.98px) { .db-hide-mobile { display: none !important; } }',
  ].join('\n');

export default buildDeviceVisibilityCss;
