import escapeHtmlText from '../support/escapeHtmlText.js';
import toSlugText from '../support/toSlugText.js';

const buildBreadcrumbTypeDefinition = (interactiveTextDefaults) => {
  const trailLabels = interactiveTextDefaults.breadcrumbTrail;
  const breadcrumbItemsMarkup = trailLabels
    .map((trailLabelText, trailIndex) =>
      trailIndex === trailLabels.length - 1
        ? `<li aria-current="page">${escapeHtmlText(trailLabelText)}</li>`
        : `<li><a href="${trailIndex === 0 ? '/' : '/' + toSlugText(trailLabelText)}">${escapeHtmlText(trailLabelText)}</a></li>`,
    )
    .join('');
  return {
    type: 'db-breadcrumb',
    isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'breadcrumb') && { type: 'db-breadcrumb' },
    model: {
      defaults: {
        tagName: 'nav',
        name: 'Breadcrumb',
        draggable: true,
        droppable: false,
        classes: ['db-breadcrumb'],
        attributes: { 'data-db-type': 'breadcrumb', 'aria-label': 'Breadcrumb' },
        components: `<ol>${breadcrumbItemsMarkup}</ol>`,
        traits: [
          {
            type: 'db-menu-items',
            name: 'dbBreadcrumbItems',
            label: 'Trail steps',
            listSelector: 'ol',
            itemMarkup: '<li><a href="/">New step</a></li>',
            addLabel: 'Add trail step',
            emptyMessage: 'No steps yet. Add the first one below.',
          },
        ],
      },
    },
  };
};

export default buildBreadcrumbTypeDefinition;
