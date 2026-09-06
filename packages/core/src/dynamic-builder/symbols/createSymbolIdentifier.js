const createSymbolIdentifier = () => 'sym-' + Math.random().toString(36).slice(2, 10);

export default createSymbolIdentifier;
