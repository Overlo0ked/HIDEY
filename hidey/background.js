// background.js

console.log("Background script loaded.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "formFilled") {
        console.log("Form filled:", request.data);
        // Here you can notify the popup or handle the filled data
        // For example, you can send a message to the popup
        chrome.runtime.sendMessage({ action: "updatePopup", data: request.data });
    }
    sendResponse({ status: "received" });
});