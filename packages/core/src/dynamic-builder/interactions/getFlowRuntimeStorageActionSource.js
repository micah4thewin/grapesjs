const getFlowRuntimeStorageActionSource = () => [
  '  remember: function (context, options) {',
  '    if (options.key) writeRemembered(options.key, options.value === undefined ? "yes" : options.value);',
  '  },',
  '  forget: function (context, options) {',
  '    if (options.key) forgetRemembered(options.key);',
  '  },',
  '  "show-if-remembered": function (context, options) {',
  '    var storedValue = readRemembered(options.key);',
  '    var matches = storedValue !== null && storedValue === String(options.value === undefined ? "yes" : options.value);',
  '    var shouldShow = options.mode === "hide" ? !matches : matches;',
  '    resolveTargets(context.element, options.target).forEach(function (target) { setHidden(target, !shouldShow); });',
  '  },',
];

export default getFlowRuntimeStorageActionSource;
