document.getElementById("clearLikedVideos").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: unlikeVideos
    });
  });
});

function unlikeVideos() {
  let menuButtons = document.querySelectorAll("ytd-menu-renderer yt-icon-button");
  if (menuButtons.length === 0) {
    console.log("No more liked videos found on this page.");
    return;
  }
  menuButtons.forEach((menuButton, index) => {
    setTimeout(() => {
      menuButton.click();
      setTimeout(() => {
        let removeButton = document.querySelector("ytd-menu-service-item-renderer:nth-of-type(5)");
        if (removeButton) {
          removeButton.click();
        }
      }, 200);
    }, index * 800);
  });

  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(unlikeVideos, 2000);
  }, menuButtons.length * 800);
}