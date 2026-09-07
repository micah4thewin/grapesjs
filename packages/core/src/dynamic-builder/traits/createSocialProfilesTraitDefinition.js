import applyListRowFieldChange from './applyListRowFieldChange.js';
import buildListEditorMarkup from './buildListEditorMarkup.js';
import buildSocialLinkItemMarkup from '../interactiveComponents/buildSocialLinkItemMarkup.js';
import buildSocialProfileRowsMarkup from './buildSocialProfileRowsMarkup.js';
import collectListRowRecords from './collectListRowRecords.js';
import handleListRowAction from './handleListRowAction.js';
import readMenuRowIndex from './readMenuRowIndex.js';
import refreshListTraitRows from './refreshListTraitRows.js';
import watchListTraitChanges from './watchListTraitChanges.js';

const emptyProfilesMessage = 'No profiles yet. Add your first one below.';

const createSocialProfilesTraitDefinition = (editor) => {
  const buildRows = (component) => buildSocialProfileRowsMarkup(component, emptyProfilesMessage);
  const refreshRows = (component, trait) => refreshListTraitRows(trait, () => buildRows(component));
  return {
    noLabel: true,
    eventCapture: ['click', 'change'],
    createInput: ({ component, trait }) => {
      watchListTraitChanges(editor, trait, component, () => refreshRows(component, trait));
      return buildListEditorMarkup({
        headingText: trait.get('label') || 'Profiles',
        itemCount: collectListRowRecords(component, '').length,
        rowsMarkup: buildRows(component),
        addLabel: 'Add profile',
        extraAttributes: { wrapper: 'data-db-social-items', rows: 'data-db-social-rows', add: 'data-db-social-add' },
      });
    },
    onEvent: ({ component, trait, event }) => {
      const eventTarget = event && event.target && event.target.closest ? event.target : null;
      if (!eventTarget || !component) return;
      const fieldElement = eventTarget.closest('[data-db-menu-field]');
      if (fieldElement) {
        if (event.type !== 'change') return;
        const fieldName = fieldElement.getAttribute('data-db-menu-field');
        applyListRowFieldChange(editor, component, '', readMenuRowIndex(fieldElement), fieldName, fieldElement);
        refreshRows(component, trait);
        return;
      }
      if (event.type !== 'click') return;
      const handled = handleListRowAction(trait, component, '', eventTarget, {
        itemMarkup: buildSocialLinkItemMarkup('website'),
        firstFieldSelector: '[data-db-menu-field="network"]',
      });
      handled && refreshRows(component, trait);
    },
    onUpdate: ({ component, trait }) => {
      refreshRows(component, trait);
    },
  };
};

export default createSocialProfilesTraitDefinition;
