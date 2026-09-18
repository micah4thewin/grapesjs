// Global regexes carry lastIndex between uses, so each caller gets its own.
export const getDataUrlPattern = () => /data:[a-z0-9.+-]+\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+/gi;

export const getPooledTokenPattern = () => /db-pooled-asset:[a-z0-9]+-[a-z0-9]+/g;

// Below this size the pool bookkeeping costs more than the copy it saves, so
// small inline icons and placeholders stay where they are.
export const minPoolableLength = 1024;
