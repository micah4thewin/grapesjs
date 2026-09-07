import buildThemeRootTokenCss from './buildThemeRootTokenCss.js';
import buildThemeTokenCss from './buildThemeTokenCss.js';

const buildSectionLayoutCss = () =>
  [
    buildThemeRootTokenCss(),
    '.db-section { position: relative; padding: var(--db-space-10, 5rem) var(--db-space-5, 1.5rem); }',
    '.db-section[data-db-layout=wide] { padding-left: var(--db-space-4, 1rem); padding-right: var(--db-space-4, 1rem); }',
    '.db-section[data-db-layout=full] { padding-left: 0; padding-right: 0; }',
    '.db-section[data-db-padding=none] { padding-top: 0; padding-bottom: 0; }',
    '.db-section[data-db-padding=compact] { padding-top: var(--db-space-8, 3rem); padding-bottom: var(--db-space-8, 3rem); }',
    '.db-section[data-db-padding=spacious] { padding-top: var(--db-space-12, 8rem); padding-bottom: var(--db-space-12, 8rem); }',
    '.db-section[data-db-min-height=half], .db-section[data-db-min-height=full] { display: flex; flex-direction: column; justify-content: center; }',
    '.db-section[data-db-min-height=half] { min-height: 50vh; min-height: 50svh; }',
    '.db-section[data-db-min-height=full] { min-height: 100vh; min-height: 100svh; }',
    '.db-section[data-db-align=center] { text-align: center; }',
    '.db-section[data-db-align=center] .db-text, .db-section[data-db-align=center] .db-quote { margin-left: auto; margin-right: auto; }',
    '.db-section[data-db-align=center] .db-button-group[data-db-align=start] { justify-content: center; }',
    buildThemeTokenCss('.db-section', { dark: ['.db-section[data-db-overlay=true]'] }),
    '.db-section[data-db-has-bg=true] { background-image: var(--db-section-bg-image, none); background-size: cover; background-position: center; background-repeat: no-repeat; }',
    '.db-section[data-db-overlay=true]::before { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.55)); pointer-events: none; }',
    '.db-section[data-db-overlay=true] > .db-container { position: relative; z-index: 1; }',
    '@media (max-width: 767.98px) {',
    '.db-section { padding-top: var(--db-space-8, 3rem); padding-bottom: var(--db-space-8, 3rem); }',
    '.db-section[data-db-padding=none] { padding-top: 0; padding-bottom: 0; }',
    '.db-section[data-db-padding=compact] { padding-top: var(--db-space-6, 2rem); padding-bottom: var(--db-space-6, 2rem); }',
    '.db-section[data-db-padding=spacious] { padding-top: var(--db-space-10, 5rem); padding-bottom: var(--db-space-10, 5rem); }',
    '}',
  ].join('\n');

export default buildSectionLayoutCss;
