// content.js

function containsKeywords(text, keywords) {
    return keywords.some(keyword => keyword.test(text));
}

function hideElementContainingKeywords() {
    const generalKeywords = [/taylor swift/i, /travis kelce/i, /t[-\s]?swift/i, /swiftie(s)?/i];
    const generalElements = document.querySelectorAll('p, h1, h2, h3, img, span');

    generalElements.forEach(element => {
        let textToCheck = element.tagName === 'IMG' ? element.alt : element.textContent;
        if (containsKeywords(textToCheck, generalKeywords)) {
            console.log('Hiding general element:', element);
            element.style.display = 'none';
        }
    });
}

function hideTMZArticles() {
    const tmzKeywords = [/taylor swift/i];
    const tmzArticleElements = document.querySelectorAll('[class*="blogroll"]');

    tmzArticleElements.forEach(article => {
        let articleText = article.textContent || "";
        if (containsKeywords(articleText, tmzKeywords)) {
            console.log('Hiding TMZ article:', article);
            article.style.display = 'none';
        } else {
            console.log('TMZ article does not contain keywords:', article);
        }
    });
}

// Apply general filtering
hideElementContainingKeywords();

// Apply TMZ-specific filtering if on TMZ
if (window.location.hostname.includes('tmz.com')) {
    hideTMZArticles();
}
