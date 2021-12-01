const pasteButton = document.getElementById("pasteButton");
const textarea = document.getElementById("abc-textarea");

textarea.addEventListener("blur", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let textareaValue = textarea.value;
  chrome.storage.sync.set({ textareaValue });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pasteTextareaContent,
  });
});

function pasteTextareaContent() {
  const iframe = document.querySelector("iframe");
  const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
  const iframeBody = iframeContent.querySelector("body");

  chrome.storage.sync.get("textareaValue", ({ textareaValue }) => {
    iframeBody.innerHTML = textareaValue;
  });
}