import watchFieldLabelEdits from './watchFieldLabelEdits.js';
import watchFormAttributeUpdates from './watchFormAttributeUpdates.js';
import watchFormStructureUpdates from './watchFormStructureUpdates.js';
import watchSubmitButtonEdits from './watchSubmitButtonEdits.js';

const watchFormComponentUpdates = (editor) => {
  watchFormAttributeUpdates(editor);
  watchFormStructureUpdates(editor);
  watchFieldLabelEdits(editor);
  watchSubmitButtonEdits(editor);
};

export default watchFormComponentUpdates;
