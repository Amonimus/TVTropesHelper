chrome.storage.sync.get("following", ({ following }) => {
    console.log(following)
    document.getElementById("following").innerHTML = following;
});
chrome.storage.sync.get("forums", ({ forums }) => {
    console.log(forums)
    document.getElementById("forums").innerHTML = forums;
});
