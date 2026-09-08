const buildMediaEditorCanvasCss = () =>
  [
    "[data-db-type='video']::before, [data-db-type='map']::before {",
    '  position: absolute; top: 0.5rem; left: 0.5rem; z-index: 1; max-width: calc(100% - 1rem);',
    '  padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(15, 23, 42, 0.78); color: #f8fafc;',
    '  font: 600 0.75rem/1.4 system-ui, sans-serif; text-align: left; pointer-events: none;',
    '}',
    "[data-db-type='video']::before { content: attr(data-db-provider) ' \\00b7 ' attr(data-db-video); }",
    "[data-db-type='video'][data-db-video='']::before, [data-db-type='video']:not([data-db-video])::before {",
    "  content: 'No video yet: paste a YouTube or Vimeo link in the settings'; background: #b45309;",
    '}',
    "[data-db-type='map']::before {",
    "  content: 'Zoom ' attr(data-db-zoom) ' \\00b7 ' attr(data-db-lat) ', ' attr(data-db-lng);",
    '}',
    "[data-db-type='image'][alt='Placeholder image'] { outline: 2px dashed rgba(37, 99, 235, 0.55); outline-offset: -2px; }",
    "img[data-db-broken='true'] {",
    '  display: inline-block; min-width: 8rem; min-height: 5rem; box-sizing: border-box; padding: 0.75rem;',
    '  outline: 2px dashed #b45309; outline-offset: -2px; background: repeating-linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0 8px, transparent 8px 16px);',
    '  color: #b45309; font: 600 0.8rem/1.4 system-ui, sans-serif;',
    '}',
  ].join('\n');

export default buildMediaEditorCanvasCss;
