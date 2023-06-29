const entries = document.getElementsByClassName("thing");
const keywords = ["passed", "died", "dead", "rip", "loss", "grief", "grieving", "rainbow bridge", "hit by a car", "goodbye", "mourning"]

for (const entry of entries) {
    for (const keyword of keywords) {
        if (entry.getElementsByClassName("title")[0].innerText.toLowerCase().includes(keyword)) {
            entry.style.display = "none";
            console.log("Hid post with keyword: " + keyword);
        }
    }
}