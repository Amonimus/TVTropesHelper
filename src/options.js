chrome.storage.sync.get("timer", function(storage){
    document.getElementById("update").value = storage.timer;
});
document.getElementById("Submit").addEventListener("click", settingsUpdate);

function settingsUpdate(){
    chrome.storage.sync.set({"timer": document.getElementById("update").value});
}