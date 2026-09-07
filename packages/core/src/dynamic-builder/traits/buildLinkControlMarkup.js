import buildLinkPageOptionsMarkup from './buildLinkPageOptionsMarkup.js';
import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getLinkKindRecords from './getLinkKindRecords.js';

const buildLinkControlMarkup = (editor, trait, linkRecord) => {
  const record = linkRecord || { kind: 'none' };
  const kindOptions = getLinkKindRecords()
    .map(
      (kindRecord) =>
        `<option value="${kindRecord.id}"${kindRecord.id === record.kind ? ' selected' : ''}>${escapeHtmlText(kindRecord.label)}</option>`,
    )
    .join('');
  return [
    '<div class="gjs-db-field gjs-db-trait-link" data-db-link>',
    `<select class="gjs-db-field-input" data-db-link-kind${buildTraitAriaLabelAttribute(trait, '- link type')}>${kindOptions}</select>`,
    `<select class="gjs-db-field-input" data-db-link-page${buildTraitAriaLabelAttribute(trait, '- page')} hidden>`,
    buildLinkPageOptionsMarkup(editor, record.pageId, record.anchorId),
    '</select>',
    `<input type="text" class="gjs-db-field-input" data-db-link-address${buildTraitAriaLabelAttribute(trait, '- address')} hidden>`,
    '<div class="gjs-db-trait-link-file" data-db-link-file hidden>',
    `<button type="button" class="gjs-db-button" data-db-link-choose-file${buildTraitAriaLabelAttribute(trait, '- choose file')}>`,
    getIconMarkup('image', { size: 14 }),
    '<span>Choose file</span></button>',
    '<span class="gjs-db-muted" data-db-link-file-name></span>',
    '</div>',
    '<p class="gjs-db-field-help gjs-db-trait-link-hint" data-db-link-hint hidden></p>',
    '<p class="gjs-db-field-help gjs-db-trait-link-summary" data-db-link-summary></p>',
    '</div>',
  ].join('');
};

export default buildLinkControlMarkup;
