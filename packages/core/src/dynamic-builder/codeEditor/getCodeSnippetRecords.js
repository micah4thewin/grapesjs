const getCodeSnippetRecords = () => ({
  html: [
    { id: 'link', label: 'Link', code: '<a class="db-button" href="/contact">Get in touch</a>' },
    {
      id: 'preconnect',
      label: 'Font preconnect',
      code: '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    },
    {
      id: 'embed',
      label: 'Responsive embed',
      code: [
        '<div style="position:relative;padding-top:56.25%">',
        '  <iframe src="https://example.com/embed" title="Embedded content" loading="lazy"',
        '    style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>',
        '</div>',
      ].join('\n'),
    },
    {
      id: 'meta',
      label: 'Verification meta',
      code: '<meta name="google-site-verification" content="your-token-here">',
    },
  ],
  css: [
    {
      id: 'variables',
      label: 'Use design tokens',
      code: '.my-panel {\n  background: var(--db-color-surface-alt);\n  color: var(--db-color-text);\n}',
    },
    {
      id: 'media',
      label: 'Mobile breakpoint',
      code: '@media (max-width: 767.98px) {\n  .my-panel {\n    padding: var(--db-space-4);\n  }\n}',
    },
    {
      id: 'reduced-motion',
      label: 'Respect reduced motion',
      code: '@media (prefers-reduced-motion: reduce) {\n  .my-panel {\n    transition: none;\n  }\n}',
    },
    {
      id: 'focus',
      label: 'Visible focus ring',
      code: '.my-panel :focus-visible {\n  outline: 2px solid var(--db-color-focus-ring);\n  outline-offset: 2px;\n}',
    },
  ],
  javascript: [
    {
      id: 'ready',
      label: 'Run when ready',
      code: "document.addEventListener('DOMContentLoaded', function () {\n  // your code here\n});",
    },
    {
      id: 'query',
      label: 'Loop over elements',
      code: "document.querySelectorAll('.my-target').forEach(function (element) {\n  element.classList.add('is-ready');\n});",
    },
    {
      id: 'dialog',
      label: 'Show a dialog',
      code: "window.dbShowDialog({ icon: 'success', title: 'Saved', text: 'All done.' });",
    },
    {
      id: 'observer',
      label: 'Watch for scroll into view',
      code: [
        'var observer = new IntersectionObserver(function (entries) {',
        '  entries.forEach(function (entry) {',
        "    if (entry.isIntersecting) entry.target.classList.add('is-visible');",
        '  });',
        '});',
        "document.querySelectorAll('.my-target').forEach(function (element) { observer.observe(element); });",
      ].join('\n'),
    },
  ],
  json: [
    { id: 'object', label: 'Object', code: '{\n  "name": "value"\n}' },
    { id: 'list', label: 'List of records', code: '[\n  { "title": "First", "url": "/first" }\n]' },
  ],
});

export default getCodeSnippetRecords;
