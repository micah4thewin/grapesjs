import getSiteCustomCodeRecord from '../exporter/getSiteCustomCodeRecord.js';

const resolveAllowScripts = (editor) => getSiteCustomCodeRecord(editor).allowScripts === true;

export default resolveAllowScripts;
