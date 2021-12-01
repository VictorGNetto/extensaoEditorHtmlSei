const textarea = document.getElementById("textarea");
const okButton = document.getElementById("ok-button");
const cancelButton = document.getElementById("cancel-button");

textarea.addEventListener("blur", async () => {
  let textareaValue = textarea.value;
  chrome.storage.local.set({ textareaValue });
});

okButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pasteTextareaContent,
  });

  window.close();
});

cancelButton.addEventListener("click", () => {
  window.close();
});

function pasteTextareaContent() {
  const iframe = document.querySelector("iframe");
  const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
  const iframeBody = iframeContent.querySelector("body");

  chrome.storage.local.get("textareaValue", ({ textareaValue }) => {
    iframeBody.innerHTML = textareaValue;
  });
}