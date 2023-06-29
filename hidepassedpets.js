const entries = document.getElementsByClassName("thing");
const keywords = ["passed", "died", "dead", "rip", "loss", "grief", "grieving", "rainbow bridge", "hit by a car", "goodbye", "mourning"]

function removeEntries() {
    if (!enabled) return;
    for (const entry of entries) {
        for (const keyword of keywords) {
            if (entry.getElementsByClassName("title")[0].innerText.toLowerCase().match(new RegExp("\\s" + keyword + "\\s", "g"))) {
                entry.style.display = "none";
            }
        }
    }
}


const targetNode = document.getElementById("siteTable");
const config = { childList: true };

const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            removeEntries();
        }
    }
};

removeEntries();
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);