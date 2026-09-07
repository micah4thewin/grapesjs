import showToastNotice from '../support/showToastNotice.js';
import ensureFieldControlId from './ensureFieldControlId.js';

const wrapOrphanFormChild = (editor, droppedComponent) => {
  if (!droppedComponent || !droppedComponent.getAttributes || !droppedComponent.parent) return false;
  if (!droppedComponent.getAttributes()['data-db-form-child']) return false;
  const parentComponent = droppedComponent.parent();
  if (!parentComponent || !parentComponent.is) return false;
  if (parentComponent.is('db-form') || parentComponent.is('db-form-row') || parentComponent.is('db-form-step'))
    return false;
  if (parentComponent.closestType && parentComponent.closestType('db-form')) return false;
  const dropIndex = parentComponent.components().indexOf(droppedComponent);
  const formComponent = parentComponent.append(
    { type: 'db-form', components: [{ type: 'db-submit-button' }, { type: 'db-form-status' }] },
    { at: dropIndex },
  )[0];
  formComponent.append(droppedComponent, { at: 0 });
  ensureFieldControlId(droppedComponent);
  editor.select(droppedComponent);
  showToastNotice(editor, 'Placed inside a new form so it can be sent', { kind: 'success' });
  return true;
};

export default wrapOrphanFormChild;
