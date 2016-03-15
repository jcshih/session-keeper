chrome.browserAction.onClicked.addListener(tab => {
  const mainURL = chrome.extension.getURL('main.html');
  chrome.tabs.query({
    url: mainURL
  }, tabs => {
    if (tabs.length === 0) {
      chrome.tabs.create({
        url: mainURL,
        selected: true
      });
    } else {
      for (let i = 1; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id);
      }
      chrome.tabs.update(tabs[0].id, { active: true });
      chrome.windows.update(tabs[0].windowId, { focused: true });
    }
  });
});
