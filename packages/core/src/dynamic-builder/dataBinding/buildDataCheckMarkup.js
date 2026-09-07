import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTargetItem = (targetIndex, titleText, detailText) =>
  [
    '<div class="gjs-db-list-item gjs-db-data-check-item">',
    `<span><strong>${escapeHtmlText(titleText)}</strong>`,
    `<span class="gjs-db-data-check-detail"> ${escapeHtmlText(detailText)}</span></span>`,
    `<button type="button" class="gjs-db-button gjs-db-button-small" data-db-check-target="${targetIndex}">Select</button>`,
    '</div>',
  ].join('');

const buildGroup = (titleText, helpText, itemsMarkup) =>
  itemsMarkup
    ? [
        '<div class="gjs-db-report-group">',
        `<div class="gjs-db-section-title">${escapeHtmlText(titleText)}</div>`,
        `<p class="gjs-db-field-help gjs-db-muted">${escapeHtmlText(helpText)}</p>`,
        `<div class="gjs-db-list">${itemsMarkup}</div>`,
        '</div>',
      ].join('')
    : '';

const buildDataCheckMarkup = (issuesRecord, targetRecords) => {
  const registerTarget = (targetRecord) => targetRecords.push(targetRecord) - 1;
  const tokensMarkup = issuesRecord.unresolvedTokens
    .map((issue) =>
      buildTargetItem(registerTarget(issue), issue.token, `${issue.componentName || 'Element'} on ${issue.pageName}`),
    )
    .join('');
  const missingMarkup = issuesRecord.missingSources
    .map((issue) =>
      buildTargetItem(registerTarget(issue), issue.sourceName || '(no source)', `Repeater on ${issue.pageName}`),
    )
    .join('');
  const emptyRepeatersMarkup = issuesRecord.emptyRepeaters
    .map((issue) => buildTargetItem(registerTarget(issue), issue.sourceName, `Repeater on ${issue.pageName}`))
    .join('');
  const listNames = (nameList) =>
    nameList.map((sourceName) => `<div class="gjs-db-list-item">${escapeHtmlText(sourceName)}</div>`).join('');
  const groupsMarkup = [
    buildGroup(
      'Tokens without a value',
      'These show as empty text on the published site. Check the spelling of the field.',
      tokensMarkup,
    ),
    buildGroup('Repeaters bound to a missing source', 'Pick another source in the repeater settings.', missingMarkup),
    buildGroup(
      'Repeaters with nothing to show',
      'Add items in Data sources or change the filter.',
      emptyRepeatersMarkup,
    ),
    buildGroup(
      'Sources with no items',
      'These sources exist but hold no data yet.',
      listNames(issuesRecord.emptySources),
    ),
    buildGroup(
      'Sources not used anywhere',
      'Safe to delete if you no longer need them.',
      listNames(issuesRecord.unusedSources),
    ),
  ].join('');
  return [
    '<div class="gjs-db-report gjs-db-data-check">',
    groupsMarkup ||
      '<p class="gjs-db-muted">Everything checks out: every token has a value and every repeater has items.</p>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-check-open-sources>Open data sources</button>',
    '</div></div>',
  ].join('');
};

export default buildDataCheckMarkup;
