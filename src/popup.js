chrome.storage.sync.get("login", function(storage){
    console.log(storage.login);
    if (storage.login == false){
        document.getElementById("login").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("name").innerHTML = "<p>Hello, Troper!</p>";
        document.body.style.overflow = "hidden";
    } else {
        document.getElementById("login").style.display = "none";
        document.getElementById("main").style.display = "block";
        document.getElementById("name").innerHTML = storage.login;
        document.body.style.overflow = "auto";
    }
});
chrome.storage.sync.get("following", function(storage){
    if (storage.following != "<ul></ul>"){
        document.getElementById("following").innerHTML = storage.following;
    } else {
        document.getElementById("following").innerHTML = "<ul><li>All read.</li></ul>";
    }
});
chrome.storage.sync.get("forums", function(storage){
    if (storage.forums != "<ul></ul>"){
        document.getElementById("forums").innerHTML = storage.forums;
    } else {
        document.getElementById("forums").innerHTML = "<ul><li>All read.</li></ul>";
    }
});
