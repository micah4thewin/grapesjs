import escapeHtmlText from '../support/escapeHtmlText.js';
import formatByteSizeText from '../support/formatByteSizeText.js';

const buildSizeRowMarkup = (labelText, sizeText, noteText) =>
  [
    '<div class="gjs-db-list-item gjs-db-export-size-row">',
    '<span>' +
      escapeHtmlText(labelText) +
      (noteText ? ' <span class="gjs-db-muted">' + escapeHtmlText(noteText) + '</span>' : '') +
      '</span>',
    '<span>' + escapeHtmlText(sizeText) + '</span>',
    '</div>',
  ].join('');

const buildExportSizeReportMarkup = (sizeReport) => {
  if (!sizeReport) return '';
  const toneLabels = { success: 'light and fast', warning: 'getting heavy', error: 'heavy' };
  const toneBadge =
    '<span class="gjs-db-badge gjs-db-badge-' +
    sizeReport.budgetTone +
    '">' +
    toneLabels[sizeReport.budgetTone] +
    '</span>';
  const rows = sizeReport.pageRows.map((pageRow) =>
    buildSizeRowMarkup(
      pageRow.fileName,
      formatByteSizeText(pageRow.byteLength),
      pageRow.inlineImageSizes.length ? pageRow.inlineImageSizes.length + ' embedded images' : '',
    ),
  );
  sizeReport.assetRows.forEach((assetRow) => {
    const savedNote =
      assetRow.fileName === 'styles.css' && sizeReport.cssSavedBytes
        ? 'after removing ' + formatByteSizeText(sizeReport.cssSavedBytes) + ' of unused styles'
        : '';
    rows.push(buildSizeRowMarkup(assetRow.fileName, formatByteSizeText(assetRow.byteLength), savedNote));
  });
  const tips = [];
  if (sizeReport.largestInlineImageBytes > 150 * 1024) {
    tips.push(
      'The largest embedded image is ' +
        formatByteSizeText(sizeReport.largestInlineImageBytes) +
        '. Resize or compress it in the Photo editor to speed up the page.',
    );
  }
  if (sizeReport.budgetTone !== 'success') tips.push('Aim for under 300 KB per page for a fast first visit.');
  return [
    '<details class="gjs-db-export-details">',
    '<summary class="gjs-db-export-summary">Size report: ' +
      escapeHtmlText(formatByteSizeText(sizeReport.totalBytes)) +
      ' in total ' +
      toneBadge +
      '</summary>',
    '<div class="gjs-db-list">' + rows.join('') + '</div>',
    tips.length ? '<div class="gjs-db-field-help">' + tips.map(escapeHtmlText).join(' ') + '</div>' : '',
    '</details>',
  ].join('');
};

export default buildExportSizeReportMarkup;
