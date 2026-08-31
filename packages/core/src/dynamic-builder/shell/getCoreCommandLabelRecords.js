const getCoreCommandLabelRecords = () => ({
  'core:undo': { label: 'Undo', iconName: 'undo', keywords: 'history back revert' },
  'core:redo': { label: 'Redo', iconName: 'redo', keywords: 'history forward repeat' },
  'core:component-outline': { label: 'Toggle outline', iconName: 'outline', keywords: 'borders wireframe view' },
  'core:preview': { label: 'Toggle preview', iconName: 'preview', keywords: 'view site hide panels' },
  'core:fullscreen': { label: 'Toggle fullscreen', iconName: 'fullscreen', keywords: 'expand view screen' },
  'core:open-code': { label: 'View code', iconName: 'code', keywords: 'html css source markup' },
  'core:open-layers': { label: 'Open layers', iconName: 'layers', keywords: 'tree structure navigator' },
  'core:open-styles': { label: 'Open styles', iconName: 'styles', keywords: 'css design properties' },
  'core:open-traits': { label: 'Open component settings', iconName: 'traits', keywords: 'attributes options' },
  'core:open-blocks': { label: 'Open blocks', iconName: 'blocks', keywords: 'library drag sections' },
  'core:open-assets': { label: 'Open assets', iconName: 'assets', keywords: 'images media files' },
  'core:copy': { label: 'Copy selection', iconName: 'copy', keywords: 'duplicate clipboard' },
  'core:paste': { label: 'Paste', iconName: 'file', keywords: 'clipboard insert' },
  'core:component-delete': { label: 'Delete component', iconName: 'trash', keywords: 'remove selection' },
  'core:component-next': { label: 'Select next component', iconName: 'arrowRight', keywords: 'navigate selection' },
  'core:component-prev': { label: 'Select previous component', iconName: 'arrowLeft', keywords: 'navigate' },
  'core:component-enter': { label: 'Select child component', iconName: 'chevronRight', keywords: 'navigate' },
  'core:component-exit': { label: 'Select parent component', iconName: 'chevronDown', keywords: 'navigate' },
});

export default getCoreCommandLabelRecords;
