document.getElementById('settingsForm').addEventListener('submit', saveOptions);

function saveOptions(e) {
    e.preventDefault();
    const keywords = document.getElementById('keywords').value.split(',').map(kw => new RegExp(kw.trim(), 'i'));
    const intensity = document.getElementById('intensity').value;
    const enableOnSiteA = document.getElementById('enableOnSiteA').checked;
    // Gather values for other toggles as needed

    browser.storage.local.set({
        'filteredKeywords': keywords,
        'filteringIntensity': intensity,
        'siteSettings': {
            'siteA': enableOnSiteA
            // Add other site settings
        }
    });
    alert('Settings saved');
}

function restoreOptions() {
    // Logic to restore settings when the options page is loaded
    // ...
}

document.addEventListener('DOMContentLoaded', restoreOptions);
