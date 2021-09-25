chrome.storage.sync.get("following", function(storage){
    console.log(storage.following);
    if (storage.following != "<ul></ul>"){
        document.getElementById("following").innerHTML = storage.following;
    } else {
        document.getElementById("following").innerHTML = "<ul><li>All read.</li></ul>";
    }
});
chrome.storage.sync.get("forums", function(storage){
    console.log(storage.forums);
    if (storage.forums != "<ul></ul>"){
        document.getElementById("forums").innerHTML = storage.forums;
    } else {
        document.getElementById("forums").innerHTML = "<ul><li>All read.</li></ul>";
    }
});
