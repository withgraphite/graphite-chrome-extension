chrome.action.onClicked.addListener(function (tab) {
  void chrome.tabs.update(tab.id || 0, { url: 'https://app.graphite.dev' });
});

export {};
