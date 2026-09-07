import buildAnnouncementTraitDefinitions from './buildAnnouncementTraitDefinitions.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import getIconMarkup from '../support/getIconMarkup.js';
import runAnnouncementBehavior from './runAnnouncementBehavior.js';

const buildAnnouncementTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-announcement',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'announcement') && { type: 'db-announcement' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Announcement bar',
      draggable: getDropTargetSelectors().pageOnly,
      droppable: false,
      classes: ['db-announcement'],
      attributes: {
        'data-db-type': 'announcement',
        'data-db-announcement': 'true',
        role: 'status',
        'data-db-dismissible': 'true',
        'data-db-storage-key': '',
        'data-db-start-date': '',
        'data-db-end-date': '',
        'data-db-link-text': '',
        'data-db-link-href': '',
      },
      components:
        `<p class="db-announcement-text">${escapeHtmlText(interactiveTextDefaults.announcementText)}</p>` +
        '<button type="button" class="db-announcement-close" data-db-announcement-close="true"' +
        ` aria-label="${escapeHtmlText(interactiveTextDefaults.announcementCloseLabel)}">` +
        getIconMarkup('close', { size: 16 }) +
        '</button>',
      script: runAnnouncementBehavior,
      traits: buildAnnouncementTraitDefinitions(),
    },
  },
});

export default buildAnnouncementTypeDefinition;
