let unpauseTimeout: number | null = null;

chrome.action.onClicked.addListener(function (tab) {
  if (unpauseTimeout) {
    unpause();
  } else {
    pause();
    unpauseTimeout = setTimeout(() => {
      unpause();
    }, 5 * 60 * 1000);
  }
});

function pause() {
  void chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: ['primary_ruleset'],
  });
  void chrome.action.setBadgeText({ text: 'pause' });
}

function unpause() {
  void chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: ['primary_ruleset'],
  });
  void chrome.action.setBadgeText({ text: '' });
  if (unpauseTimeout) {
    clearTimeout(unpauseTimeout);
  }
  unpauseTimeout = null;
}

export {};
