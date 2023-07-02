const entries = document.getElementsByClassName("thing");
const keywords = ["passed", "die", "died", "dead", "rip", "loss", "put down", "grief", "grieving", "rainbow bridge", "hit by a car", "goodbye", "mourning"]
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
        if (entry in blockedEntries) continue;
        for (const keyword of keywords) {
            let title = entry.getElementsByClassName("title")[0].innerText.toLowerCase();
            if (title.match(new RegExp("\\b" + keyword + "\\b", "g"))) {
                entry.style.display = "none";
                blockedEntries.push(entry);
            }
        }
    }
}

function addCatIconToTitle(entry) {
    let title = entry.getElementsByClassName("title")[0];
    let catIcon = document.createElement("img");
    catIcon.classList.add("passed-pets-cat-icon");
    catIcon.src = browser.runtime.getURL("icons/cat_32.png");
    catIcon.style.marginRight = "5px";
    catIcon.alt = "This post might be about a pet that has passed away."
    title.insertBefore(catIcon, title.firstChild);
}

browser.runtime.onMessage.addListener(async (request) => {
    let length = 0;
    console.log(request);
    if (request.unhide) {
        length = blockedEntries.length;
        unhideEntries();
        blockedEntries = new Array();
    }
    else if (request.requestCount) {
        length = blockedEntries.length;
    }
    else {
        removeEntries();
        length = blockedEntries.length;
    }
    let response = Promise.resolve({ count: length });
    return response;
});

function unhideEntries() {
    for (const entry of blockedEntries) {
        entry.style.display = "block";
        if (entry.getElementsByClassName("passed-pets-cat-icon").length == 0)
            addCatIconToTitle(entry);
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