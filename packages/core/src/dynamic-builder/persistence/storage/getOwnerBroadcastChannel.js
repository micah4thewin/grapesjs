const openChannels = new Map();

// Writing the owner record to IndexedDB raises no storage event, so a second
// tab is told directly. Missing BroadcastChannel only costs the warning.
const getOwnerBroadcastChannel = (channelName) => {
  if (openChannels.has(channelName)) return openChannels.get(channelName);
  let ownerChannel = null;
  try {
    if (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function') {
      ownerChannel = new window.BroadcastChannel(channelName);
    }
  } catch (channelError) {
    ownerChannel = null;
  }
  openChannels.set(channelName, ownerChannel);
  return ownerChannel;
};

export const closeOwnerBroadcastChannels = () => {
  openChannels.forEach((ownerChannel) => {
    try {
      ownerChannel && ownerChannel.close();
    } catch (closeError) {
      /* the page is going away anyway */
    }
  });
  openChannels.clear();
};

export default getOwnerBroadcastChannel;
