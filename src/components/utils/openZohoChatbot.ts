// components/utils/openZohoChatbot.ts
export const openZohoChatbot = () => {
  const openChat = () => {
    const chatButton = document.getElementById('zsiq_float');
    if (chatButton) {
      chatButton.click();
      sessionStorage.setItem('chatAutoOpened', 'true');
      return true;
    }
    return false;
  };

  // Try immediately
  if (!openChat()) {
    // Fallback: retry after short delay if widget isn't ready yet
    setTimeout(() => {
      openChat();
    }, 2000);
  }
};
