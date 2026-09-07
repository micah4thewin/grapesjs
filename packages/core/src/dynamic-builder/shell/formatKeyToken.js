const formatKeyToken = (keyToken, prefersApple) => {
  const normalizedToken = String(keyToken || '')
    .trim()
    .toLowerCase();
  const namedTokens = {
    '\u2318': prefersApple ? '\u2318' : 'Cmd',
    cmd: prefersApple ? '\u2318' : 'Cmd',
    command: prefersApple ? '\u2318' : 'Cmd',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    shift: prefersApple ? '\u21E7' : 'Shift',
    alt: prefersApple ? '\u2325' : 'Alt',
    option: prefersApple ? '\u2325' : 'Alt',
    slash: '/',
    esc: 'Esc',
    escape: 'Esc',
    enter: 'Enter',
    return: 'Enter',
    backspace: 'Backspace',
    delete: 'Delete',
    del: 'Delete',
    space: 'Space',
    up: '\u2191',
    down: '\u2193',
    left: '\u2190',
    right: '\u2192',
  };
  if (namedTokens[normalizedToken]) return namedTokens[normalizedToken];
  if (normalizedToken.length === 1) return normalizedToken.toUpperCase();
  return normalizedToken.charAt(0).toUpperCase() + normalizedToken.slice(1);
};

export default formatKeyToken;
