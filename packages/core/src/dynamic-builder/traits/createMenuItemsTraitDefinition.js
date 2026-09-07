import applyListRowFieldChange from './applyListRowFieldChange.js';
import buildListEditorMarkup from './buildListEditorMarkup.js';
import buildMenuItemRowsMarkup from './buildMenuItemRowsMarkup.js';
import collectListRowRecords from './collectListRowRecords.js';
import handleListRowAction from './handleListRowAction.js';
import readMenuRowIndex from './readMenuRowIndex.js';
import refreshListTraitRows from './refreshListTraitRows.js';
import resolveMenuTraitSettings from './resolveMenuTraitSettings.js';
import watchListTraitChanges from './watchListTraitChanges.js';

const createMenuItemsTraitDefinition = (editor) => {
  const buildRows = (component, trait) => {
    const settings = resolveMenuTraitSettings(trait);
    return buildMenuItemRowsMarkup(editor, component, settings.listSelector, settings.emptyMessage);
  };
  const refreshRows = (component, trait) => refreshListTraitRows(trait, () => buildRows(component, trait));
  return {
    noLabel: true,
    eventCapture: ['click', 'change'],
    createInput: ({ component, trait }) => {
      const settings = resolveMenuTraitSettings(trait);
      watchListTraitChanges(editor, trait, component, () => refreshRows(component, trait));
      return buildListEditorMarkup({
        headingText: trait.get('label') || 'Menu items',
        itemCount: collectListRowRecords(component, settings.listSelector).length,
        rowsMarkup: buildRows(component, trait),
        addLabel: settings.addLabel,
        extraAttributes: { wrapper: 'data-db-menu-items', rows: 'data-db-menu-rows', add: 'data-db-menu-add' },
      });
    },
    onEvent: ({ component, trait, event }) => {
      const eventTarget = event && event.target && event.target.closest ? event.target : null;
      if (!eventTarget || !component) return;
      const settings = resolveMenuTraitSettings(trait);
      const fieldElement = eventTarget.closest('[data-db-menu-field]');
      if (fieldElement) {
        if (event.type !== 'change') return;
        const fieldName = fieldElement.getAttribute('data-db-menu-field');
        const rowIndex = readMenuRowIndex(fieldElement);
        if (fieldName === 'pageLink' && !fieldElement.value) {
          trait.dbPendingFocus = { rowIndex, selector: '[data-db-menu-field="href"]', selectionStart: null };
        }
        applyListRowFieldChange(editor, component, settings.listSelector, rowIndex, fieldName, fieldElement);
        refreshRows(component, trait);
        return;
      }
      if (event.type !== 'click') return;
      const handled = handleListRowAction(trait, component, settings.listSelector, eventTarget, {
        itemMarkup: settings.itemMarkup,
        firstFieldSelector: '[data-db-menu-field="label"]',
      });
      handled && refreshRows(component, trait);
    },
    onUpdate: ({ component, trait }) => {
      refreshRows(component, trait);
    },
  };
};

export default createMenuItemsTraitDefinition;
