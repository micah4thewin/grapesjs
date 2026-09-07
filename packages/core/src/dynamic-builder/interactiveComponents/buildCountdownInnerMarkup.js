import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCountdownInnerMarkup = (interactiveTextDefaults) => {
  const segmentRecords = [
    { segmentKey: 'days', segmentLabel: 'Days' },
    { segmentKey: 'hours', segmentLabel: 'Hours' },
    { segmentKey: 'minutes', segmentLabel: 'Minutes' },
    { segmentKey: 'seconds', segmentLabel: 'Seconds' },
  ];
  const segmentsMarkup = segmentRecords
    .map(
      (segmentRecord) =>
        '<div class="db-countdown-segment">' +
        `<span class="db-countdown-value" data-gjs-type="default" data-db-count-${segmentRecord.segmentKey}="true">00</span>` +
        `<span class="db-countdown-label">${segmentRecord.segmentLabel}</span>` +
        '</div>',
    )
    .join('');
  return (
    `<div class="db-countdown-grid" data-db-countdown-grid="true" aria-hidden="false">${segmentsMarkup}</div>` +
    '<p class="db-countdown-message" data-gjs-type="default" data-db-countdown-message="true" hidden="hidden"></p>' +
    '<span class="db-visually-hidden" data-gjs-type="default" data-db-countdown-summary="true">' +
    escapeHtmlText(interactiveTextDefaults.countdownSummaryText) +
    '</span>'
  );
};

export default buildCountdownInnerMarkup;
