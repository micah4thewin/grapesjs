import describeRejectedSvgNotice from './describeRejectedSvgNotice.js';
import showToastNotice from '../support/showToastNotice.js';

const rejectUnsafeSvgAsset = (editor, assetRecord) => {
  const assetName = String((assetRecord.get && assetRecord.get('name')) || 'SVG file');
  if (editor.Assets && editor.Assets.remove) editor.Assets.remove(assetRecord);
  editor.trigger('db:asset:rejected', { name: assetName, reason: 'unsafe-svg' });
  showToastNotice(editor, describeRejectedSvgNotice(assetName), { kind: 'error', duration: 5000 });
};

export default rejectUnsafeSvgAsset;
