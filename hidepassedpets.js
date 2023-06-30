const entries = document.getElementsByClassName("thing");
const keywords = ["passed", "die", "died", "dead", "rip", "loss", "lost", "grief", "grieving", "rainbow bridge", "hit by a car", "goodbye", "mourning"]
let blockedEntries = new Array();
let enabled = true;
function removeEntries() {
    for (const entry of entries) {
        for (const keyword of keywords) {
            let title = entry.getElementsByClassName("title")[0].innerText.toLowerCase();
            if (title.match(new RegExp("\\b" + keyword + "\\b", "g")) && !blockedEntries.includes(title)) {
                entry.style.display = "none";
                if (localStorage.getItem("blocked-passed-pets-posts") == null) {
                    localStorage.setItem("blocked-passed-pets-posts", 1);
                }
                else {
                    localStorage.setItem("blocked-passed-pets-posts", parseInt(localStorage.getItem("blocked-passed-pets-posts")) + 1);
                }
                blockedEntries.push(title);
            }
        }
    }
}


browser.runtime.onMessage.addListener(async (request) => {
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