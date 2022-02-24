/**
 * Pause button
 */

const UNPAUSE_ALARM_NAME = 'UNPAUSE_ALARM';
let paused = false;

chrome.action.onClicked.addListener(function (tab) {
  if (paused) {
    unpause();
  } else {
    pause();
    paused = true;
    chrome.alarms.create(UNPAUSE_ALARM_NAME, {
      delayInMinutes: 5,
    });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === UNPAUSE_ALARM_NAME) {
    unpause();
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
  if (paused) {
    void chrome.alarms.clear(UNPAUSE_ALARM_NAME);
  }
  paused = false;
}

/**
 * Allow site to see if chrome extension exists
 */

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  sendResponse({ ok: true });
});

export {};
