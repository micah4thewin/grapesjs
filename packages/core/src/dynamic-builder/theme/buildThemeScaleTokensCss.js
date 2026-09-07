const buildThemeScaleTokensCss = () => `
.gjs-editor-cont {
  --gjs-db-lift-1: 0 1px 1px var(--gjs-db-shade);
  --gjs-db-lift-2: 0 1px 2px var(--gjs-db-shade), 0 2px 8px var(--gjs-db-shade);
  --gjs-db-lift-3: 0 1px 2px var(--gjs-db-shade), 0 10px 30px var(--gjs-db-shade);
  --gjs-db-lift-4: 0 2px 6px var(--gjs-db-shade), 0 20px 56px var(--gjs-db-shade);
  --gjs-db-float: 0 1px 2px var(--gjs-db-shade), 0 10px 30px var(--gjs-db-shade);
  --gjs-db-press-1: inset 0 1px 2px var(--gjs-db-shade);
  --gjs-db-press-2: inset 0 1px 3px var(--gjs-db-shade);
  --gjs-db-seam: inset 0 -1px 0 var(--gjs-db-line);
  --gjs-db-r-1: 6px;
  --gjs-db-r-2: 8px;
  --gjs-db-r-3: 12px;
  --gjs-db-r-4: 16px;
  --gjs-db-r-pill: 999px;
  --gjs-db-gap-1: 4px;
  --gjs-db-gap-2: 8px;
  --gjs-db-gap-3: 12px;
  --gjs-db-gap-4: 16px;
  --gjs-db-gap-5: 24px;
  --gjs-db-gap-6: 32px;
  --gjs-db-fs-1: 11px;
  --gjs-db-fs-2: 12px;
  --gjs-db-fs-3: 13px;
  --gjs-db-fs-4: 15px;
  --gjs-db-fs-5: 18px;
  --gjs-db-lh-tight: 1.35;
  --gjs-db-lh: 1.55;
  --gjs-db-tap: 32px;
  --gjs-db-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --gjs-db-ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
  --gjs-db-ease-spring: cubic-bezier(0.34, 1.24, 0.64, 1);
  --gjs-db-dur-1: 120ms;
  --gjs-db-dur-2: 160ms;
  --gjs-db-dur-3: 220ms;
  --gjs-db-dur-4: 320ms;
  --gjs-db-font-ui: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --gjs-db-font-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Consolas, monospace;
  --gjs-db-w-normal: 400;
  --gjs-db-w-medium: 500;
  --gjs-db-w-bold: 600;
}
@media (pointer: coarse) {
  .gjs-editor-cont {
    --gjs-db-tap: 44px;
  }
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
