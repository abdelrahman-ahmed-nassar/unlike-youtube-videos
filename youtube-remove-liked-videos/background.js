chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ key: 'value' }, () => {
        console.log('The value is set to "value".');
    });
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "colorChanged") {
      console.log("Background color was changed");
    }
  }
);