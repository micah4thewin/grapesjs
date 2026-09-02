const buildThemeScaleTokensCss = () => `
.gjs-editor-cont {
  --gjs-db-lift-1: 0 1px 2px var(--gjs-db-shade), inset 0 1px 0 var(--gjs-db-glow);
  --gjs-db-lift-2: 0 1px 2px var(--gjs-db-shade), 0 3px 10px var(--gjs-db-shade), inset 0 1px 0 var(--gjs-db-glow);
  --gjs-db-lift-3: 0 2px 6px var(--gjs-db-shade), 0 12px 32px var(--gjs-db-shade), inset 0 1px 0 var(--gjs-db-glow);
  --gjs-db-lift-4: 0 6px 18px var(--gjs-db-shade), 0 28px 70px var(--gjs-db-shade), inset 0 1px 0 var(--gjs-db-glow);
  --gjs-db-press-1: inset 0 1px 3px var(--gjs-db-shade);
  --gjs-db-press-2: inset 0 2px 6px var(--gjs-db-shade), inset 0 1px 2px var(--gjs-db-shade);
  --gjs-db-seam: inset 0 1px 0 var(--gjs-db-glow), inset 0 -1px 0 var(--gjs-db-shade);
  --gjs-db-r-1: 5px;
  --gjs-db-r-2: 8px;
  --gjs-db-r-3: 12px;
  --gjs-db-r-4: 16px;
  --gjs-db-r-pill: 999px;
  --gjs-db-gap-1: 0.25rem;
  --gjs-db-gap-2: 0.5rem;
  --gjs-db-gap-3: 0.75rem;
  --gjs-db-gap-4: 1rem;
  --gjs-db-gap-5: 1.5rem;
  --gjs-db-gap-6: 2.25rem;
  --gjs-db-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --gjs-db-ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
  --gjs-db-ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1);
  --gjs-db-dur-1: 120ms;
  --gjs-db-dur-2: 200ms;
  --gjs-db-dur-3: 320ms;
  --gjs-db-dur-4: 480ms;
  --gjs-db-font-ui: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --gjs-db-font-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Consolas, monospace;
  --gjs-db-w-normal: 400;
  --gjs-db-w-medium: 600;
  --gjs-db-w-bold: 700;
}
@media (prefers-reduced-motion: reduce) {
  .gjs-editor-cont {
    --gjs-db-dur-1: 1ms;
    --gjs-db-dur-2: 1ms;
    --gjs-db-dur-3: 1ms;
    --gjs-db-dur-4: 1ms;
    --gjs-db-ease-spring: var(--gjs-db-ease-soft);
  }
  .gjs-editor-cont *,
  .gjs-editor-cont *::before,
  .gjs-editor-cont *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
`;

export default buildThemeScaleTokensCss;
