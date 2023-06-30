let hidden = true;

function queryTabs(codeString, callback) {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.executeScript(tabs[0].id, { code: codeString }).then(result => {
            return callback(result);
        });
    });
}

//send message to content script to unhide entries without local storage
document.getElementById("unhide").addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        let response = browser.tabs.sendMessage(tabs[0].id, { unhide: hidden ? false : true });
        let count = 0;
        response.then((result) => { count = result.count });
        hidden = !hidden;
        document.getElementById("unhide").innerHTML = (hidden ? "Unh" : "H") + "ide posts " + count;
    });
});



queryTabs("localStorage.getItem('blocked-passed-pets-posts')", (result) => {
    const res = result[0] == null ? 0 : result[0];
    document.getElementById("counter").innerHTML = "You have hidden " + res + " posts."
});


document.getElementById("reset").addEventListener("click", () => {
    queryTabs("localStorage.setItem('blocked-passed-pets-posts', 0)", (result) => { });
    document.getElementById("counter").innerText = "You have hidden 0 posts.";
});

