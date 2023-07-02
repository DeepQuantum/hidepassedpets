let hidden = true;

function queryTabs(codeString, callback) {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.executeScript(tabs[0].id, { code: codeString }).then(result => {
            return callback(result);
        });
    });
}


document.getElementById("unhide").addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }).then(async tabs => {
        let response = browser.tabs.sendMessage(tabs[0].id, { unhide: hidden ? false : true });
        let count = await response.then((result) => { return result.count; });
        document.getElementById("unhide").innerHTML = (hidden ? "Unh" : "H") + `ide ${count} posts`;
        hidden = !hidden;
    });
});