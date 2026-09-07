import getAnimationEffectRecords from './getAnimationEffectRecords.js';

const getAnimationGalleryCss = () => {
  const keyframeRules = getAnimationEffectRecords()
    .filter((effectRecord) => effectRecord.from)
    .map(
      (effectRecord) =>
        '@keyframes db-aos-demo-' +
        effectRecord.id +
        ' { 0% { ' +
        effectRecord.from +
        ' } 55%, 100% { opacity: 1; transform: none; filter: none; } }',
    );
  const hoverRules = getAnimationEffectRecords()
    .filter((effectRecord) => effectRecord.from)
    .map(
      (effectRecord) =>
        '.gjs-db-aos-tile:hover [data-db-aos-demo="' +
        effectRecord.id +
        '"], .gjs-db-aos-tile:focus-visible [data-db-aos-demo="' +
        effectRecord.id +
        '"] { animation: db-aos-demo-' +
        effectRecord.id +
        ' 1.5s cubic-bezier(0.22, 1, 0.36, 1) infinite; }',
    );
  return [
    '.gjs-db-aos-gallery-form { display: grid; gap: 14px; }',
    '.gjs-db-aos-gallery-intro { margin: 0; font-size: 12px; line-height: 1.6; color: var(--gjs-db-muted, #64748b); }',
    '.gjs-db-aos-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(124px, 1fr)); gap: 10px;',
    '  margin: 0; padding: 0; list-style: none; }',
    '.gjs-db-aos-tile { display: grid; gap: 6px; width: 100%; min-height: 44px; padding: 8px; border-radius: 10px;',
    '  border: 1px solid var(--gjs-db-line, rgba(15, 23, 42, 0.12)); background: var(--gjs-db-panel, #fff);',
    '  color: inherit; font: inherit; font-size: 11.5px; font-weight: 600; text-align: center; cursor: pointer; }',
    '.gjs-db-aos-tile:hover { border-color: var(--gjs-db-accent, #4f46e5); }',
    '.gjs-db-aos-tile[aria-pressed="true"] { outline: 2px solid var(--gjs-db-accent, #4f46e5); outline-offset: 1px; }',
    '.gjs-db-aos-stage { display: flex; align-items: center; justify-content: center; height: 58px;',
    '  border-radius: 8px; overflow: hidden; perspective: 400px;',
    '  background: var(--gjs-db-sunken, rgba(15, 23, 42, 0.05)); }',
    '.gjs-db-aos-demo { width: 36px; height: 22px; border-radius: 5px; background: var(--gjs-db-accent, #4f46e5); }',
    '.gjs-db-aos-tile[data-db-aos-effect="none"] .gjs-db-aos-demo { opacity: 0.35; }',
    '.gjs-db-aos-stagger-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: 12px; }',
    '.gjs-db-aos-stagger-row input[type="checkbox"] { width: 18px; height: 18px; margin: 0; }',
    '.gjs-db-aos-stagger-row select { min-height: 32px; }',
    '@media (prefers-reduced-motion: reduce) { .gjs-db-aos-demo { animation: none !important; } }',
    ...keyframeRules,
    ...hoverRules,
  ].join('\n');
};

export default getAnimationGalleryCss;
