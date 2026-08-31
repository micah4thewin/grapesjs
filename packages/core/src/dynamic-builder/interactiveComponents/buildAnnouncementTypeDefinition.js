import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import runAnnouncementBehavior from './runAnnouncementBehavior.js';

const buildAnnouncementTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-announcement',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'announcement') && { type: 'db-announcement' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Announcement bar',
      draggable: true,
      droppable: false,
      classes: ['db-announcement'],
      attributes: {
        'data-db-type': 'announcement',
        'data-db-announcement': 'true',
        role: 'status',
        'data-db-dismissible': 'true',
        'data-db-storage-key': 'db-announcement-default',
        'data-db-start-date': '',
        'data-db-end-date': '',
      },
      components:
        `<p class="db-announcement-text">${escapeHtmlText(interactiveTextDefaults.announcementText)}</p>` +
        '<button type="button" class="db-announcement-close" data-db-announcement-close="true"' +
        ` aria-label="${escapeHtmlText(interactiveTextDefaults.announcementCloseLabel)}">` +
        getIconMarkup('close', { size: 16 }) +
        '</button>',
      script: runAnnouncementBehavior,
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-dismissible',
          label: 'Dismissible',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
        { type: 'text', name: 'data-db-storage-key', label: 'Dismissal storage key' },
        { type: 'db-date', name: 'data-db-start-date', label: 'Show from' },
        { type: 'db-date', name: 'data-db-end-date', label: 'Show until' },
      ],
    },
  },
});

export default buildAnnouncementTypeDefinition;
