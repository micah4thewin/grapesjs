const parseVideoLinkRecord = (linkText) => {
  const sourceText = String(linkText || '').trim();
  if (!sourceText) return null;
  const youtubeMatch = sourceText.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  if (youtubeMatch) return { provider: 'youtube', videoId: youtubeMatch[1] };
  const vimeoMatch = sourceText.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?(\d+)/);
  if (vimeoMatch) return { provider: 'vimeo', videoId: vimeoMatch[1] };
  if (/^https?:\/\/\S+\.(?:mp4|webm|ogv|ogg|mov|m4v)(?:\?\S*)?$/i.test(sourceText)) {
    return { provider: 'file', videoId: sourceText };
  }
  if (/^[A-Za-z0-9_-]{11}$/.test(sourceText)) return { provider: 'youtube', videoId: sourceText };
  if (/^\d{6,}$/.test(sourceText)) return { provider: 'vimeo', videoId: sourceText };
  return null;
};

export default parseVideoLinkRecord;
