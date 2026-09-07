import runNavbarScrollBehavior from './runNavbarScrollBehavior.js';

const getNavbarScrollRuntimeSource = () => '(' + runNavbarScrollBehavior.toString() + ')();';

export default getNavbarScrollRuntimeSource;
