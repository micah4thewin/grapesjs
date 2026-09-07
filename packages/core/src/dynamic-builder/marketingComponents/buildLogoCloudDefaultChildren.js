import buildLogoItemRecord from './buildLogoItemRecord.js';

const buildLogoCloudDefaultChildren = () =>
  ['Acme Co', 'Northwind', 'Globex', 'Initech', 'Luminary', 'Vertex'].map((logoName) => buildLogoItemRecord(logoName));

export default buildLogoCloudDefaultChildren;
