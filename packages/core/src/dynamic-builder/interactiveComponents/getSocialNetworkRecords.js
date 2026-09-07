const defineNetwork = (networkName, networkLabel, iconName, urlPlaceholder, hostNames, brandColor) => ({
  networkName,
  networkLabel,
  iconName,
  urlPlaceholder,
  hostNames,
  brandColor,
});

const getSocialNetworkRecords = () => [
  defineNetwork('x', 'X', 'twitterX', 'https://x.com/your-name', ['x.com', 'twitter.com'], '#000000'),
  defineNetwork('facebook', 'Facebook', 'facebook', 'https://facebook.com/your-page', ['facebook.com', 'fb.com'], '#1877f2'),
  defineNetwork('instagram', 'Instagram', 'instagram', 'https://instagram.com/your-name', ['instagram.com'], '#e1306c'),
  defineNetwork('linkedin', 'LinkedIn', 'linkedin', 'https://linkedin.com/in/your-name', ['linkedin.com'], '#0a66c2'),
  defineNetwork('youtube', 'YouTube', 'youtube', 'https://youtube.com/@your-channel', ['youtube.com', 'youtu.be'], '#ff0000'),
  defineNetwork('github', 'GitHub', 'github', 'https://github.com/your-name', ['github.com'], '#181717'),
  defineNetwork('tiktok', 'TikTok', 'tiktok', 'https://tiktok.com/@your-name', ['tiktok.com'], '#000000'),
  defineNetwork('whatsapp', 'WhatsApp', 'whatsapp', 'https://wa.me/your-number', ['wa.me', 'whatsapp.com'], '#25d366'),
  defineNetwork('telegram', 'Telegram', 'telegram', 'https://t.me/your-name', ['t.me', 'telegram.me'], '#26a5e4'),
  defineNetwork('pinterest', 'Pinterest', 'pinterest', 'https://pinterest.com/your-name', ['pinterest.com'], '#bd081c'),
  defineNetwork('discord', 'Discord', 'discord', 'https://discord.gg/your-invite', ['discord.gg', 'discord.com'], '#5865f2'),
  defineNetwork('reddit', 'Reddit', 'reddit', 'https://reddit.com/r/your-community', ['reddit.com'], '#ff4500'),
  defineNetwork('twitch', 'Twitch', 'twitch', 'https://twitch.tv/your-name', ['twitch.tv'], '#9146ff'),
  defineNetwork('threads', 'Threads', 'threads', 'https://threads.net/@your-name', ['threads.net'], '#000000'),
  defineNetwork('mastodon', 'Mastodon', 'mastodon', 'https://mastodon.social/@your-name', ['mastodon.social'], '#6364ff'),
  defineNetwork('medium', 'Medium', 'medium', 'https://medium.com/@your-name', ['medium.com'], '#000000'),
  defineNetwork('behance', 'Behance', 'behance', 'https://behance.net/your-name', ['behance.net'], '#1769ff'),
  defineNetwork('dribbble', 'Dribbble', 'dribbble', 'https://dribbble.com/your-name', ['dribbble.com'], '#ea4c89'),
  defineNetwork('snapchat', 'Snapchat', 'snapchat', 'https://snapchat.com/add/your-name', ['snapchat.com'], '#fffc00'),
  defineNetwork('slack', 'Slack', 'slack', 'https://your-team.slack.com', ['slack.com'], '#4a154b'),
  defineNetwork('email', 'Email', 'mail', 'mailto:you@example.com', [], '#6b7280'),
  defineNetwork('website', 'Website', 'globe', 'https://your-site.com', [], '#6b7280'),
];

export default getSocialNetworkRecords;
