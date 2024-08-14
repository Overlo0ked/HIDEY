// content.js
console.log("Content script is running on the page.");
// content.js
console.log("Content script is running on the page.");

// Object to store the last known values for inputs
const lastValues = {};

// Create an overlay to display filled fields
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.bottom = '10px';
overlay.style.right = '10px';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
overlay.style.color = 'white';
overlay.style.padding = '10px';
overlay.style.borderRadius = '5px';
overlay.style.zIndex = '9999';
overlay.style.maxHeight = '300px';
overlay.style.overflowY = 'auto';
overlay.style.display = 'none'; // Hidden initially

document.body.appendChild(overlay);

// Function to show the overlay with filled field data
function showOverlay(data) {
    overlay.innerHTML += `<div><strong>${data.name}</strong>: <span>${data.value}</span></div>`;
    overlay.style.display = 'block'; // Show the overlay
}

// Function to check filled fields
function checkFilledFields(input) {
    const currentValue = input.value;
    const inputIdentifier = input.name ? input.name : (input.id ? input.id : 'unknown');

    // Debug: log the current value and inputIdentifier
    console.log(`Input with identifier '${inputIdentifier}' is filled: '${currentValue}'`);

    // Check if the current value is different from the last known value
    if (currentValue && currentValue !== lastValues[inputIdentifier]) {
        lastValues[inputIdentifier] = currentValue; // Update the last known value
        
        const filledData = {
            name: inputIdentifier,
            value: currentValue,
        };

        console.log("Field filled:", filledData.name, '=', filledData.value); // For debugging
        showOverlay(filledData); // Display in overlay
    }
}

// Listen for focusout events on relevant input fields
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select');

inputs.forEach(input => {
    input.addEventListener('focusout', () => {
        checkFilledFields(input); // Check when the field loses focus
    });
});

// MutationObserver to detect newly added input fields
let observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        const newInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select');

        newInputs.forEach(input => {
            // Only add event listeners to inputs that don't already have one
            if (!lastValues[input.name] && !lastValues[input.id]) {
                input.addEventListener('focusout', () => {
                    checkFilledFields(input);
                });
            }
        });
    });
});

// Observe the body of the document for any child element changes
observer.observe(document.body, { childList: true, subtree: true });

console.log("MutationObserver is set up and monitoring changes...");