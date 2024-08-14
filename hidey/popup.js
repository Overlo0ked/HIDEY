// popup.js

// Store filled fields data
let filledFields = [];

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "formFilled") {
        filledFields.push(request.data); // Collect filled fields
        
        // Update the popup with the latest field data
        updateFilledFields();
    }
});

// Function to update the filled fields display
function updateFilledFields() {
    const container = document.getElementById('filledFieldsContainer');
    container.innerHTML = ""; // Clear existing content

    filledFields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'field';
        fieldDiv.innerHTML = `<strong>${field.name}</strong>: <span>${field.value}</span>`;
        container.appendChild(fieldDiv);
    });
}