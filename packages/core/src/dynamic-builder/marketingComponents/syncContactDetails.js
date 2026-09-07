import escapeHtmlText from '../support/escapeHtmlText.js';
import buildDirectionsUrl from './buildDirectionsUrl.js';
import buildPhoneHref from './buildPhoneHref.js';
import findDescendantByField from './findDescendantByField.js';
import readComponentPlainText from './readComponentPlainText.js';

const syncContactDetails = (contactComponent) => {
  if (!contactComponent || !contactComponent.getAttributes) return;
  const attributeRecord = contactComponent.getAttributes();
  const writeField = (fieldName, fieldText, hrefValue) => {
    const fieldComponent = findDescendantByField(contactComponent, fieldName);
    if (!fieldComponent) return;
    const liveElement = fieldComponent.getEl ? fieldComponent.getEl() : null;
    const isBeingEdited = Boolean(liveElement && liveElement.isContentEditable);
    if (fieldText !== undefined && !isBeingEdited && readComponentPlainText(fieldComponent) !== fieldText) {
      fieldComponent.components(escapeHtmlText(fieldText));
    }
    if (hrefValue !== undefined && fieldComponent.getAttributes().href !== hrefValue) {
      fieldComponent.addAttributes({ href: hrefValue });
    }
  };
  const addressText = String(attributeRecord['data-db-address'] || '').trim();
  const phoneText = String(attributeRecord['data-db-phone'] || '').trim();
  const emailText = String(attributeRecord['data-db-email'] || '').trim();
  if (attributeRecord['data-db-address'] !== undefined) writeField('address', addressText);
  if (attributeRecord['data-db-phone'] !== undefined) writeField('phone', phoneText, buildPhoneHref(phoneText));
  if (attributeRecord['data-db-email'] !== undefined) writeField('email', emailText, 'mailto:' + emailText);
  if (attributeRecord['data-db-address'] !== undefined)
    writeField('directions', undefined, buildDirectionsUrl(addressText));
};

export default syncContactDetails;
