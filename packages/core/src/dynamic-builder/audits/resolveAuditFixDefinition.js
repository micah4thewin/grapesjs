import getAuditFixDefinitions from './getAuditFixDefinitions.js';
import openSeoFieldFromAudit from './openSeoFieldFromAudit.js';

const resolveAuditFixDefinition = (fixId) => {
  const fixKey = String(fixId || '');
  if (!fixKey) return null;
  if (fixKey.startsWith('seo-field:')) {
    const fieldKey = fixKey.slice('seo-field:'.length);
    return {
      id: fixKey,
      label: 'Open SEO settings',
      opensPanel: true,
      run: (editor) => openSeoFieldFromAudit(editor, fieldKey),
    };
  }
  return getAuditFixDefinitions().find((fixDefinition) => fixDefinition.id === fixKey) || null;
};

export default resolveAuditFixDefinition;
