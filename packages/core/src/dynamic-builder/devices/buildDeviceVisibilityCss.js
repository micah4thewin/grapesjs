const buildDeviceVisibilityCss = () =>
  [
    '@media (min-width: 992px) { .db-hide-desktop { display: none !important; } }',
    '@media (min-width: 768px) and (max-width: 991.98px) { .db-hide-tablet { display: none !important; } }',
    '@media (max-width: 767.98px) { .db-hide-mobile { display: none !important; } }',
    '@media (max-width: 767.98px) { .db-stack-mobile { display: flex; flex-direction: column; } }',
    '@media (max-width: 767.98px) { .db-reverse-mobile { display: flex; flex-direction: column-reverse; } }',
  ].join('\n');

export default buildDeviceVisibilityCss;
