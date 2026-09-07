const runVideoFacadeBehavior = () => {
  document.querySelectorAll('[data-db-type="video"]').forEach((videoElement) => {
    if (videoElement.dataset.dbVideoReady) return;
    videoElement.dataset.dbVideoReady = 'true';
    const isSafeUrl = (rawValue) => Boolean(rawValue) && rawValue.indexOf('javascript:') !== 0;
    const readPoster = () => videoElement.getAttribute('data-db-poster') || '';
    const applyPoster = () => {
      const posterUrl = readPoster();
      videoElement.style.backgroundImage = isSafeUrl(posterUrl)
        ? 'url("' + posterUrl.split('"').join('%22') + '")'
        : '';
    };
    const parseYoutubeId = (rawValue) => {
      const urlMatch = rawValue.match(
        /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
      );
      if (urlMatch) return urlMatch[1];
      return /^[A-Za-z0-9_-]{11}$/.test(rawValue) ? rawValue : '';
    };
    const parseVimeoId = (rawValue) => {
      const urlMatch = rawValue.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?(\d+)/);
      if (urlMatch) return urlMatch[1];
      return /^\d+$/.test(rawValue) ? rawValue : '';
    };
    const resolveEmbedSource = (providerName, rawValue) => {
      if (providerName === 'vimeo') {
        const vimeoId = parseVimeoId(rawValue);
        return vimeoId ? 'https://player.vimeo.com/video/' + vimeoId + '?autoplay=1&dnt=1' : '';
      }
      const youtubeId = parseYoutubeId(rawValue);
      return youtubeId ? 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=1&rel=0' : '';
    };
    const buildFilePlayer = (rawValue, titleText) => {
      const playerElement = document.createElement('video');
      playerElement.controls = true;
      playerElement.autoplay = true;
      playerElement.src = rawValue;
      playerElement.setAttribute('title', titleText);
      playerElement.setAttribute('playsinline', '');
      playerElement.setAttribute('preload', 'metadata');
      if (isSafeUrl(readPoster())) playerElement.setAttribute('poster', readPoster());
      return playerElement;
    };
    const buildEmbedFrame = (embedSource, titleText) => {
      const frameElement = document.createElement('iframe');
      frameElement.src = embedSource;
      frameElement.title = titleText;
      frameElement.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture',
      );
      frameElement.setAttribute('allowfullscreen', '');
      frameElement.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      return frameElement;
    };
    const showMissingNotice = () => {
      if (videoElement.querySelector('[data-db-video-missing]')) return;
      const noticeElement = document.createElement('p');
      noticeElement.className = 'db-facade-note db-facade-missing';
      noticeElement.setAttribute('data-db-video-missing', 'true');
      noticeElement.setAttribute('role', 'alert');
      noticeElement.textContent = 'This video has not been set up yet.';
      videoElement.appendChild(noticeElement);
    };
    videoElement.addEventListener('click', (clickEvent) => {
      if (videoElement.dataset.dbVideoLoaded || document.body.hasAttribute('data-db-editing')) return;
      const clickTarget = clickEvent.target;
      const loadTrigger = clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-video-load]') : null;
      if (!loadTrigger || !videoElement.contains(loadTrigger)) return;
      const providerName = videoElement.getAttribute('data-db-provider') || 'youtube';
      const rawValue = (videoElement.getAttribute('data-db-video') || '').trim();
      const titleText = videoElement.getAttribute('data-db-title') || 'Embedded video';
      const usesFile = providerName === 'file';
      const embedSource = usesFile ? '' : resolveEmbedSource(providerName, rawValue);
      if (usesFile ? !isSafeUrl(rawValue) : !embedSource) {
        showMissingNotice();
        return;
      }
      videoElement.dataset.dbVideoLoaded = 'true';
      const playerElement = usesFile ? buildFilePlayer(rawValue, titleText) : buildEmbedFrame(embedSource, titleText);
      while (videoElement.firstChild) videoElement.removeChild(videoElement.firstChild);
      videoElement.appendChild(playerElement);
      if (playerElement.focus) playerElement.focus();
    });
    if (window.MutationObserver)
      new MutationObserver(applyPoster).observe(videoElement, {
        attributes: true,
        attributeFilter: ['data-db-poster'],
      });
    applyPoster();
  });
};

export default runVideoFacadeBehavior;
