function set_icon_notification(){
    chrome.action.setIcon({
        path:{
            "16": "icons/red/icon16.png",
            "32": "icons/red/icon32.png",
            "48": "icons/red/icon48.png",
            "128": "icons/red/icon128.png"
        }
    });
}
function set_icon_default(){
    chrome.action.setIcon({
        path:{
            "16": "icons/default/icon16.png",
            "32": "icons/default/icon32.png",
            "48": "icons/default/icon48.png",
            "128": "icons/default/icon128.png"
        }
    });
}

chrome.runtime.onInstalled.addListener(function(details){
    console.log("init");

    let following = '<ul><li>All read.</li></ul>';
    chrome.storage.sync.set({"following": following});
    let forums = '<ul><li>All read.</li></ul>';
    chrome.storage.sync.set({"forums": forums});
    
    chrome.alarms.create('timer', {periodInMinutes: 1});
    getTable("Following");
    getTable("Forums");
});

chrome.alarms.onAlarm.addListener(function(alarm){
    if (alarm.name == 'timer'){
        console.log("timer");
        set_icon_default();
        getTable("Following");
        getTable("Forums");
    }
});

function postError(source){
    let message = "<ul><li>Couldn't load "+source+"!</li></ul>";
    if (source == "Following"){
        chrome.storage.sync.set({"following": message});
    } else if (source == "Forums"){
        chrome.storage.sync.set({"forums": message});
    } 
}

function getTable(source){
    var link;
    if (source == "Following"){
        link = 'https://tvtropes.org/pmwiki/awl.php';
    } else if (source == "Forums"){
        link = 'https://tvtropes.org/pmwiki/thread_watch.php'
    }
    fetch(link)
    .then(response => {
        console.log("got");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        if (html.includes('<table')){
            table = html.split('<table')[1].split('</table>')[0];
            rows = table.split('<tr');
            var message = '<ul>';
            for (var i=1; i<rows.length; i++){
                var test;
                if (source == "Following"){
                    test = rows[i].includes('class="dark');
                } else if (source == "Forums"){
                    test = rows[i].includes('fa-check-circle');
                }
                if (test){
                    console.log("This is unread");
                    if (source == "Following"){
                        var href = rows[i].split("<td")[4].split('href="')[1].split('"')[0];
                        var title = rows[i].split("<td")[2].split('target="_blank" >')[1].split("</a>")[0];
                        var time = rows[i].split("<td")[1].split("</button> ")[1].split("</td>")[0];
                        var sender = rows[i].split("<td")[3].split('"/pmwiki/pmwiki.php/Tropers/')[1].split('"')[0];
                    } else if (source == "Forums"){
                        var href = rows[i].split("<td")[2].split('post you have not read" href="')[1].split('"')[0];
                        var title = rows[i].split("<td")[2].split("</a>")[0].split('>').slice(-1)[0];
                        var time = rows[i].split("<td")[4].split("</a>")[0].split('>').slice(-1)[0];
                        var sender = rows[i].split("<td")[5].split("</td>")[0].split('>')[1];
                    }
                    set_icon_notification();
                    message += '<li><a href="https://tvtropes.org/' + href + '" target="_blank">' + title + "</a> on " + time + " by " + sender + "</li>";
                } else {
                    console.log("This is read");
                }
            }
            message += "</ul>";
            console.log("sending");
            console.log(message);
            if (source == "Following"){
                chrome.storage.sync.set({"following": message});
            } else if (source == "Forums"){
                chrome.storage.sync.set({"forums": message});
            }
        } else {
            postError(source);
        }
    })
    .catch(error => {
        console.log("error");
        console.log(error);
    });
}