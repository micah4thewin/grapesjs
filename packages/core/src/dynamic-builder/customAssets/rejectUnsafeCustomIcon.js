import describeRejectedSvgNotice from '../icons/describeRejectedSvgNotice.js';
import showToastNotice from '../support/showToastNotice.js';

const rejectUnsafeCustomIcon = (editor, assetName) => {
  const safeName = String(assetName || 'SVG file');
  editor.trigger('db:asset:rejected', { name: safeName, reason: 'unsafe-svg' });
  showToastNotice(editor, describeRejectedSvgNotice(safeName), { kind: 'error', duration: 5000 });
  return false;
};

export default rejectUnsafeCustomIcon;
