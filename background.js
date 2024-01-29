// background.js
let counter = { text: 0, images: 0 };

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "incrementCounter") {
    counter.text += message.textCount;
    counter.images += message.imageCount;
  } else if (message.type === "getCounter") {
    return Promise.resolve(counter);
  }
});
