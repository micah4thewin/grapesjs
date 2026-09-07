import getBuiltInIconSearchAliases from './getBuiltInIconSearchAliases.js';
import getCustomIconAliasRecords from '../customAssets/getCustomIconAliasRecords.js';

const getIconSearchAliases = () => ({ ...getBuiltInIconSearchAliases(), ...getCustomIconAliasRecords() });

export default getIconSearchAliases;
