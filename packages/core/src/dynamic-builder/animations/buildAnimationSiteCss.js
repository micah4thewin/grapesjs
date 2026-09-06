import getAnimationEasingRecords from './getAnimationEasingRecords.js';
import getAnimationEffectRecords from './getAnimationEffectRecords.js';

const buildAnimationSiteCss = () => {
  const effectRules = getAnimationEffectRecords()
    .filter((effectRecord) => effectRecord.from)
    .map(
      (effectRecord) =>
        '[data-db-aos-ready="true"] [data-db-aos="' +
        effectRecord.id +
        '"]:not([data-db-aos-in="true"]) { ' +
        effectRecord.from +
        ' }',
    );
  const easingRules = getAnimationEasingRecords().map(
    (easingRecord) =>
      '[data-db-aos][data-db-aos-easing="' + easingRecord.id + '"] { --db-aos-easing: ' + easingRecord.value + '; }',
  );
  return [
    '[data-db-aos] { --db-aos-duration: 700ms; --db-aos-delay: 0ms;',
    '  --db-aos-easing: cubic-bezier(0.22, 1, 0.36, 1); }',
    '[data-db-aos-ready="true"] [data-db-aos]:not([data-db-aos="none"]) {',
    '  transition: opacity var(--db-aos-duration) var(--db-aos-easing) var(--db-aos-delay),',
    '    transform var(--db-aos-duration) var(--db-aos-easing) var(--db-aos-delay),',
    '    filter var(--db-aos-duration) var(--db-aos-easing) var(--db-aos-delay);',
    '  will-change: opacity, transform; }',
    ...effectRules,
    ...easingRules,
    '[data-db-aos][data-db-aos-in="true"] { opacity: 1; transform: none; filter: none; }',
    '@media (prefers-reduced-motion: reduce) {',
    '  [data-db-aos] { transition: none !important; opacity: 1 !important;',
    '    transform: none !important; filter: none !important; } }',
  ].join('\n');
};

export default buildAnimationSiteCss;
