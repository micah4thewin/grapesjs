import collectUnresolvedBindingTokens from '../dataBinding/collectUnresolvedBindingTokens.js';
import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';

const collectUnresolvedTokenItems = (editor) =>
  collectUnresolvedBindingTokens(editor).map((tokenEntry) =>
    createPreflightItem(
      'warning',
      'Data',
      describeAuditComponent(tokenEntry.component) + ' shows data that does not exist: ' + tokenEntry.token + '.',
      'Add the missing field in Data sources, or correct the token so it matches a field that exists.',
      tokenEntry.component,
      tokenEntry.page,
      'open-data-sources',
    ),
  );

export default collectUnresolvedTokenItems;
