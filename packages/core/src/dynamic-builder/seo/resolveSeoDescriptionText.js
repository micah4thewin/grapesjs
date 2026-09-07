const resolveSeoDescriptionText = (siteSeoRecord, pageSeoRecord) =>
  String(pageSeoRecord.description || siteSeoRecord.defaultDescription || '').trim();

export default resolveSeoDescriptionText;
