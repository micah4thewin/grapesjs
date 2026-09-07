import hasHostProvidedContent from './hasHostProvidedContent.js';

const isDraftRecoveryMode = (editor, moduleOptions) => !moduleOptions.autoload || hasHostProvidedContent(editor);

export default isDraftRecoveryMode;
