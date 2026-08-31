import buildBlockDefinition from './buildBlockDefinition.js';
import buildColumnsContentRecord from './buildColumnsContentRecord.js';

const buildLayoutBlocks = () => [
  buildBlockDefinition('db-section', 'Section', 'Layout', 'section', { type: 'db-section' }),
  buildBlockDefinition('db-container', 'Container', 'Layout', 'layout', { type: 'db-container' }),
  buildBlockDefinition('db-columns-two', 'Two columns', 'Layout', 'columns', { type: 'db-columns' }),
  buildBlockDefinition(
    'db-columns-three',
    'Three columns',
    'Layout',
    'grid',
    buildColumnsContentRecord('three', [null, null, null]),
  ),
  buildBlockDefinition(
    'db-columns-four',
    'Four columns',
    'Layout',
    'grid',
    buildColumnsContentRecord('four', [null, null, null, null]),
  ),
  buildBlockDefinition(
    'db-sidebar-layout',
    'Sidebar layout',
    'Layout',
    'flex',
    buildColumnsContentRecord('sidebar-right', [null, null]),
  ),
  buildBlockDefinition('db-spacer', 'Spacer', 'Layout', 'spacer', { type: 'db-spacer' }),
  buildBlockDefinition('db-divider', 'Divider', 'Layout', 'divider', { type: 'db-divider' }),
];

export default buildLayoutBlocks;
