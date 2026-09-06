import createFlowIdentifier from './createFlowIdentifier.js';

const buildAlertButtonFlowRecord = (attributesRecord, existingFlowId) => {
  const followUpKind = String(attributesRecord['data-db-alert-then'] || 'none');
  const followUpValue = String(attributesRecord['data-db-alert-url'] || '');
  const alertAction = {
    type: 'alert',
    options: {
      kind: String(attributesRecord['data-db-alert-kind'] || 'success'),
      title: String(attributesRecord['data-db-alert-title'] || 'Thanks!'),
      text: String(attributesRecord['data-db-alert-text'] || ''),
      confirmText: String(attributesRecord['data-db-alert-confirm'] || 'OK'),
      cancelText: String(attributesRecord['data-db-alert-cancel'] || ''),
    },
  };
  const flowActions = [alertAction];
  if (followUpKind === 'open-url' && followUpValue) {
    flowActions.push({ type: 'open-url', options: { url: followUpValue, newTab: 'false' } });
  }
  if (followUpKind === 'submit-form' && followUpValue) {
    flowActions.push({ type: 'submit-form', options: { target: followUpValue } });
  }
  return { id: existingFlowId || createFlowIdentifier(), trigger: 'click', triggerOptions: {}, actions: flowActions };
};

export default buildAlertButtonFlowRecord;
