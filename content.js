// content.js

function containsKeywords(text, keywords) {
    return keywords.some(keyword => keyword.test(text));
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

function hideElements(selector, keywords) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        let textToCheck = element.tagName === 'IMG' ? element.alt || element.src : element.textContent;
        if (containsKeywords(textToCheck, keywords)) {
            element.style.display = 'none';
        }
    });
}

function applyFilteringWithUserSettings() {
    try {
        browser.storage.local.get('filteredKeywords', (data) => {
            const userKeywords = data.filteredKeywords || [/taylor swift/i]; // Default keywords
            hideElements('p, h1, h2, h3, img, span', userKeywords);
        });
    } catch (error) {
        console.error('Error in content filtering:', error);
    }
}

const debouncedFiltering = debounce(applyFilteringWithUserSettings, 250);

function observeDynamicContent() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                debouncedFiltering();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

debouncedFiltering();
observeDynamicContent();
