const formatKeysText = (keysText) =>
  String(keysText || '')
    .split(',')
    .map((keysVariant) =>
      keysVariant
        .trim()
        .split('+')
        .map((keyToken) => {
          const normalizedToken = keyToken.trim();
          if (normalizedToken === '\u2318') return 'Cmd';
          if (!normalizedToken) return normalizedToken;
          return normalizedToken.charAt(0).toUpperCase() + normalizedToken.slice(1);
        })
        .join('+'),
    )
    .join(' or ');

export default formatKeysText;
