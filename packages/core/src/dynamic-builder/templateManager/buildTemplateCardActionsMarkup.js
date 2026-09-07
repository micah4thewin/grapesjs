import escapeHtmlText from '../support/escapeHtmlText.js';

const buildActionButton = (actionName, labelText, isPrimary) =>
  [
    `<button type="button" class="gjs-db-button${isPrimary ? ' gjs-db-button-primary' : ''}"`,
    ` data-db-template-action="${escapeHtmlText(actionName)}">`,
    escapeHtmlText(labelText),
    '</button>',
  ].join('');

const buildTemplateCardActionsMarkup = (templateRecord) => {
  const kindButtons =
    templateRecord.kind === 'page'
      ? [buildActionButton('use-page', 'Use for this page', true), buildActionButton('add-page', 'Add as new page')]
      : [
          buildActionButton('insert-after', 'Insert after selection', true),
          buildActionButton('insert-end', 'Insert at end'),
        ];
  const deleteButton =
    templateRecord.source === 'user'
      ? [
          '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-template-action="delete">Delete</button>',
        ]
      : [];
  return '<div class="gjs-db-button-row">' + [...kindButtons, ...deleteButton].join('') + '</div>';
};

export default buildTemplateCardActionsMarkup;
