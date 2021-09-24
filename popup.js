function set_icon_notification(){
    chrome.action.setIcon({
        path:{
            "16": "icons/icon16.png",
            "32": "icons/icon32.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png"
        }
    });
}
function set_icon_default(){
    chrome.action.setIcon({
        path:{
            "16": "images/icon16.png",
            "32": "images/icon32.png",
            "48": "images/icon48.png",
            "128": "images/icon128.png"
        }
    });
}

chrome.storage.sync.get("following", function(storage){
    console.log(storage.following);
    if (storage.following != ""){
        document.getElementById("following").innerHTML = storage.following;
    }
});
chrome.storage.sync.get("forums", function(storage){
    console.log(storage.forums);
    if (storage.forums != ""){
        document.getElementById("forums").innerHTML = storage.forums;
    }
});
