import getNewPageStarterComponents from '../shell/getNewPageStarterComponents.js';

const buildStarterSiteProjectData = (siteRecord) => ({
  pages: [
    { name: 'Home', component: getNewPageStarterComponents(siteRecord && siteRecord.name ? siteRecord.name : 'Home') },
  ],
  styles: [],
  assets: [],
});

export default buildStarterSiteProjectData;
