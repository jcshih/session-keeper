chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({
    url: chrome.extension.getURL('window.html'),
    selected: true
  });
});
