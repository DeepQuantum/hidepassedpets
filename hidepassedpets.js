const entries = document.getElementsByClassName("thing");
const keywords = ["passed", "die", "died", "dead", "rip", "loss", "put down", "lost", "grief", "grieving", "rainbow bridge", "hit by a car", "goodbye", "mourning"]
const subredditKeywords = ["pet", "pets", "cat", "cats", "dog", "dogs", "animal"];
let blockedEntries = new Array();
let enabled = true;

function isPetSubredditURL() {
    if (window.location.href.match(/reddit\.com\/r\/\w+\/comments/g) != null) {
        return false;
    }
    for (const subredditKeyword of subredditKeywords) {
        if (window.location.href.toLowerCase().includes(subredditKeyword)) {
            return true;
        }
    }
    return false;
}

function removeEntries() {
    if (!isPetSubredditURL()) return;
    for (const entry of entries) {
        for (const keyword of keywords) {
            let title = entry.getElementsByClassName("title")[0].innerText.toLowerCase();
            if (title.match(new RegExp("\\b" + keyword + "\\b", "g")) && !blockedEntries.includes(title)) {
                entry.style.display = "none";
                blockedEntries.push(title);
            }
        }
    }
}


browser.runtime.onMessage.addListener(async (request) => {
    let length = 0;
    if (request.unhide) {
        length = blockedEntries.length;
        unhideEntries();
        blockedEntries = new Array();
    }
    else {
        removeEntries();
        length = blockedEntries.length;
    }
    let response = Promise.resolve({ count: length });
    return response;
});

function unhideEntries() {
    for (const entry of entries) {
        entry.style.display = "block";
    }
}

const targetNode = document.getElementById("siteTable");
const config = { childList: true };

const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            removeEntries();
        }
    }
};

removeEntries();
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);