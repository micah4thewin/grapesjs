import dropComponentAttributes from '../support/dropComponentAttributes.js';
import readComponentPlainText from '../support/readComponentPlainText.js';
import isPlaceholderCopyText from './isPlaceholderCopyText.js';

const syncPlaceholderMarker = (hostComponent, contentTextDefaults, allowMarking) => {
  const hasLegacyClass = hostComponent.getClasses().indexOf('db-layout-placeholder') >= 0;
  if (hasLegacyClass) hostComponent.removeClass('db-layout-placeholder');
  const hasMarker = Boolean(hostComponent.getAttributes()['data-db-placeholder']);
  const isPlaceholder = isPlaceholderCopyText(readComponentPlainText(hostComponent), contentTextDefaults);
  if (hasMarker && !isPlaceholder) dropComponentAttributes(hostComponent, ['data-db-placeholder']);
  else if (!hasMarker && isPlaceholder && (allowMarking || hasLegacyClass)) {
    hostComponent.addAttributes({ 'data-db-placeholder': 'true' });
  }
};

export default syncPlaceholderMarker;
