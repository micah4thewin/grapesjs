import collectDataBindingIssues from './collectDataBindingIssues.js';
import summarizeDataBindingIssues from './summarizeDataBindingIssues.js';
import showToastNotice from '../support/showToastNotice.js';

const watchExportForDataIssues = (editor) => {
  const warnAboutIssues = () => {
    let summaryText = '';
    try {
      summaryText = summarizeDataBindingIssues(collectDataBindingIssues(editor));
    } catch (checkError) {
      summaryText = '';
    }
    if (!summaryText) return;
    showToastNotice(editor, `${summaryText}. Run Data check to review them.`, { kind: 'warning', duration: 6000 });
  };
  editor.on('run:db:download-site', warnAboutIssues);
  editor.on('run:db:publish-site', warnAboutIssues);
};

export default watchExportForDataIssues;
