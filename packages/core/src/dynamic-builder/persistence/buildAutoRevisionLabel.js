import formatIsoDateTimeText from './formatIsoDateTimeText.js';

const buildAutoRevisionLabel = (revisionDate) => 'Revision ' + formatIsoDateTimeText(revisionDate);

export default buildAutoRevisionLabel;
