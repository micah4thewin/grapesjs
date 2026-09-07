const getEffectPresetRecords = () => ({
  filter: [
    { id: 'none', label: 'None' },
    { id: 'blur(4px)', label: 'Soft blur' },
    { id: 'blur(12px)', label: 'Strong blur' },
    { id: 'grayscale(1)', label: 'Black and white' },
    { id: 'sepia(0.6)', label: 'Warm sepia' },
    { id: 'brightness(1.1)', label: 'Brighter' },
    { id: 'brightness(0.85)', label: 'Darker' },
    { id: 'contrast(1.2)', label: 'More contrast' },
    { id: 'saturate(1.4)', label: 'More colour' },
    { id: 'drop-shadow(0 8px 16px rgba(15, 23, 42, 0.25))', label: 'Drop shadow' },
  ],
  backdropFilter: [
    { id: 'none', label: 'None' },
    { id: 'blur(12px) saturate(1.4)', label: 'Frosted glass' },
    { id: 'blur(4px)', label: 'Soft blur behind' },
    { id: 'blur(16px)', label: 'Strong blur behind' },
    { id: 'brightness(0.8)', label: 'Dim what is behind' },
    { id: 'grayscale(1)', label: 'Black and white behind' },
  ],
});

export default getEffectPresetRecords;
