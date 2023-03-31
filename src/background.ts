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
