chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == 'badge') {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.browserAction.setBadgeText({ text: request.num.toString(), tabId: tab.id });
    });
  }
});
