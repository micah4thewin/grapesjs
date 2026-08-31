const getSiteMetaRecord = (editor) => editor.getModel().get('dbSiteMeta') || {};

export default getSiteMetaRecord;
