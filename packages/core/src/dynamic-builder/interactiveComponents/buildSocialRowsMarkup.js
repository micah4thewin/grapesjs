import buildListRowMarkup from './buildListRowMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getSocialNetworkRecords from './getSocialNetworkRecords.js';
import readSocialProfileRecords from './readSocialProfileRecords.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const buildSocialRowsMarkup = (rootComponent) => {
  const profileRecords = readSocialProfileRecords(rootComponent);
  const pasteBoxMarkup =
    '<input class="gjs-db-field-input" data-db-social-paste="true" inputmode="url"' +
    ' placeholder="Paste a profile link to add it" aria-label="Paste a profile link to add it">';
  if (!profileRecords.length) {
    return '<p class="gjs-db-muted">No profiles yet. Paste a profile link or add one below.</p>' + pasteBoxMarkup;
  }
  const networkRecords = getSocialNetworkRecords();
  const rowsMarkup = profileRecords
    .map((profileRecord, profileIndex) => {
      const optionsMarkup = networkRecords
        .map(
          (networkRecord) =>
            `<option value="${escapeHtmlText(networkRecord.networkName)}"${networkRecord.networkName === profileRecord.networkName ? ' selected' : ''}>${escapeHtmlText(networkRecord.networkLabel)}</option>`,
        )
        .join('');
      const placeholderText = resolveSocialNetworkRecord(profileRecord.networkName).urlPlaceholder;
      return buildListRowMarkup(
        profileIndex,
        `<select class="gjs-db-field-input" data-db-social-field="network" aria-label="Network">${optionsMarkup}</select>` +
          `<input class="gjs-db-field-input" data-db-social-field="href" value="${escapeHtmlText(profileRecord.linkHref)}" placeholder="${escapeHtmlText(placeholderText)}" aria-label="Profile URL">` +
          (profileRecord.linkHref
            ? ''
            : '<span class="gjs-db-field-help">Hidden on the live site until you add the link</span>'),
      );
    })
    .join('');
  return rowsMarkup + pasteBoxMarkup;
};

export default buildSocialRowsMarkup;
