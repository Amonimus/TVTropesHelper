let following = '<ul><li>All read.</li></ul>';
chrome.storage.sync.set({"following": following});
let forums = '<ul><li>All read.</li></ul>';
chrome.storage.sync.set({"forums": forums});

getFollowing();
getForums();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    // read `newIconPath` from request and read `tab.id` from sender
    chrome.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
    });
});

function getFollowing(){
    $.get('https://tvtropes.org/pmwiki/awl.php', function(data, textStatus, jqXHR){
        if (textStatus == "success"){
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            var table = doc.getElementsByTagName('table')[0];
            var rows = table.getElementsByTagName('tr')
            var message = '<ul>'
            for (var i=0; i<rows.length; i++){
                if(rows[i].classList.contains("dark")){
                    var h = rows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href
                    var v = rows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].textContent
                    var t = rows[i].getElementsByTagName('td')[0].textContent.split('Unfollow ')[1]
                    var s = rows[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0].textContent
                    message += '<li><a href="' + h + '" target="_blank">' + v + "</a> at " + t + " by " + s + "</li>";
                }
            }
            message += "</ul>";
            let following = message;
            chrome.storage.sync.set({"following": following});
        } else {
            let following = "Couldn't load Following.";
            chrome.storage.sync.set({"following": following});
        }
    });
}
function getForums(){
    $.get('https://tvtropes.org/pmwiki/thread_watch.php', function(data, textStatus, jqXHR){
        console.log(textStatus);
        if (textStatus == "success"){
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            var table = doc.getElementsByTagName('table')[0];
            var rows = table.getElementsByTagName('tr')
            var message = '<ul>'
            for (var i=0; i<rows.length; i++){
                if(rows[i].getElementsByClassName("fa-check-circle").length == 1){
                    var h = rows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href
                    var v = rows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].textContent
                    var t = rows[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].textContent
                    var s = rows[i].getElementsByTagName('td')[4].textContent
                    message += '<li><a href="' + h + '" target="_blank">' + v + "</a> at " + t + " by " + s + "</li>";
                }
            }
            message += "</ul>";
            let forums = message;
            chrome.storage.sync.set({"forums": forums});
        } else {
            let forums = "Couldn't load Forums.";
            chrome.storage.sync.set({"forums": forums});
        }
    });
}