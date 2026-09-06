import captureSiteMetaDefaults from './captureSiteMetaDefaults.js';
import registerSiteMetaProjectHooks from './registerSiteMetaProjectHooks.js';

const applySiteMetaFoundation = (editor) => {
  registerSiteMetaProjectHooks(editor);
  if (editor.onReady) editor.onReady(() => captureSiteMetaDefaults(editor));
};

export default applySiteMetaFoundation;
