// background.js
let counter = { text: 0, images: 0 };

function updateCounter(textCount, imageCount) {
  counter.text += textCount;
  counter.images += imageCount;
  console.log("Updated counter:", counter); // Debugging line
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "incrementCounter") {
    updateCounter(message.textCount, message.imageCount);
  }
});
