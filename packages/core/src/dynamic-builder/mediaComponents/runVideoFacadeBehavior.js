const runVideoFacadeBehavior = () => {
  document.querySelectorAll('[data-db-type="video"]').forEach((videoElement) => {
    if (videoElement.dataset.dbVideoReady) return;
    videoElement.dataset.dbVideoReady = 'true';
    const posterUrl = videoElement.getAttribute('data-db-poster') || '';
    if (posterUrl && posterUrl.indexOf('javascript:') !== 0)
      videoElement.style.backgroundImage = 'url("' + posterUrl.split('"').join('%22') + '")';
    const readLastPathSegment = (rawValue) => {
      const cleanValue = rawValue.split('?')[0].split('#')[0];
      const pathSegments = cleanValue.split('/').filter((pathSegment) => pathSegment.length > 0);
      return pathSegments[pathSegments.length - 1] || '';
    };
    const resolveEmbedSource = (providerName, rawValue, allowAutoplay) => {
      const autoplayFlag = allowAutoplay ? '1' : '0';
      if (providerName === 'vimeo') {
        const vimeoId = rawValue.indexOf('http') === 0 ? readLastPathSegment(rawValue) : rawValue;
        return 'https://player.vimeo.com/video/' + encodeURIComponent(vimeoId) + '?autoplay=' + autoplayFlag + '&dnt=1';
      }
      let youtubeId = rawValue;
      if (rawValue.indexOf('http') === 0) {
        const queryIndex = rawValue.indexOf('v=');
        youtubeId = queryIndex >= 0 ? rawValue.slice(queryIndex + 2).split('&')[0] : readLastPathSegment(rawValue);
      }
      const embedBase = 'https://www.youtube-nocookie.com/embed/';
      return embedBase + encodeURIComponent(youtubeId) + '?autoplay=' + autoplayFlag + '&rel=0';
    };
    const buildFilePlayer = (rawValue, titleText, allowAutoplay) => {
      const playerElement = document.createElement('video');
      playerElement.controls = true;
      playerElement.src = rawValue;
      playerElement.setAttribute('title', titleText);
      playerElement.setAttribute('playsinline', '');
      if (allowAutoplay) playerElement.autoplay = true;
      return playerElement;
    };
    const buildEmbedFrame = (providerName, rawValue, titleText, allowAutoplay) => {
      const frameElement = document.createElement('iframe');
      frameElement.src = resolveEmbedSource(providerName, rawValue, allowAutoplay);
      frameElement.title = titleText;
      frameElement.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture',
      );
      frameElement.setAttribute('allowfullscreen', '');
      frameElement.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      return frameElement;
    };
    videoElement.addEventListener('click', (clickEvent) => {
      if (videoElement.dataset.dbVideoLoaded) return;
      const clickTarget = clickEvent.target;
      const loadTrigger = clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-video-load]') : null;
      if (!loadTrigger || !videoElement.contains(loadTrigger)) return;
      const providerName = videoElement.getAttribute('data-db-provider') || 'youtube';
      const rawValue = (videoElement.getAttribute('data-db-video') || '').trim();
      if (!rawValue || rawValue.indexOf('javascript:') === 0) return;
      const titleText = videoElement.getAttribute('data-db-title') || 'Embedded video';
      const allowAutoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      videoElement.dataset.dbVideoLoaded = 'true';
      const playerElement =
        providerName === 'file'
          ? buildFilePlayer(rawValue, titleText, allowAutoplay)
          : buildEmbedFrame(providerName, rawValue, titleText, allowAutoplay);
      while (videoElement.firstChild) videoElement.removeChild(videoElement.firstChild);
      videoElement.appendChild(playerElement);
      if (playerElement.focus) playerElement.focus();
    });
  });
};

export default runVideoFacadeBehavior;
