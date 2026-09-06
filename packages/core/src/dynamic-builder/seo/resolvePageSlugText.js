import resolvePagePublicPath from '../support/resolvePagePublicPath.js';
import resolveTargetPage from './resolveTargetPage.js';

const resolvePageSlugText = (editor, page) => resolvePagePublicPath(editor, resolveTargetPage(editor, page));

export default resolvePageSlugText;
