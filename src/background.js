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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "asyncFunc"){
            (async () => {
                mes = await ExUpdate();
                console.log(mes);
                sendResponse({msg: mes});
            })();
            return true;
        };
    }
);

chrome.runtime.onInstalled.addListener(function(details){
    console.log("tvtropes helper init");
   
    chrome.storage.sync.set({"login": false});

    chrome.storage.sync.set({"following": '<ul><li>All read.</li></ul>'});
    chrome.storage.sync.set({"forums": '<ul><li>All read.</li></ul>'});
    
    chrome.storage.sync.set({"timer": 1});
    chrome.storage.sync.get("timer", function(storage){
        chrome.alarms.create('timer', {periodInMinutes: storage.timer});
    });
});

chrome.alarms.onAlarm.addListener(function(alarm){
    chrome.storage.sync.get("timer", function(storage){
        chrome.alarms.create('timer', {periodInMinutes: storage.timer});
    });
    if (alarm.name == 'timer'){
        ExUpdate();
    }
});

async function ExUpdate(){
    // console.log("tvtropes helper refresh");
    set_icon_default();
    var dbg;
    dbg = await getTable("Following");
    dbg += " "+await getTable("Forums");
    return dbg;
}

function postError(source){
    let message = "<ul><li>Couldn't load "+source+"!</li></ul>";
    if (source == "Following"){
        chrome.storage.sync.set({"following": message});
    } else if (source == "Forums"){
        chrome.storage.sync.set({"forums": message});
    } 
}

async function getTable(source){
    var link;
    var result = "Result";
    if (source == "Following"){
        link = 'https://tvtropes.org/pmwiki/awl.php';
    } else if (source == "Forums"){
        link = 'https://tvtropes.org/pmwiki/thread_watch.php'
    }
    fetcher = await fetch(link)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        if (html.includes('<table')){
            var username = html.split('/pmwiki/unknower.php?handle=')[1].split('"')[0];
            var img = html.split('header-hover-menu"><img src="')[1].split('"')[0];
            var profile = '<b><p>Hello, <a href="https://tvtropes.org/pmwiki/pmwiki.php/Tropers/'+username+'" target="_blank">'+username+'</a>!</p></b><a href="https://tvtropes.org/pmwiki/pmwiki.php/Tropers/'+username+'" target="_blank"><img class="profilepic" height=50px src="'+img+'"></a>';
            chrome.storage.sync.set({"login": profile});
            
            var table = html.split('<table')[1].split('</table>')[0];
            var rows = table.split('<tr');
            var message = '<ul>';
            for (var i=1; i<rows.length; i++){
                var test;
                if (source == "Following"){
                    test = rows[i].includes('class="dark');
                } else if (source == "Forums"){
                    test = rows[i].includes('fa-check-circle');
                }
                if (test){
                    if (source == "Following"){
                        try {
                            var href = rows[i].split("<td")[4].split('href="')[1].split('"')[0];
                        } catch(e){
                            var href = rows[i].split("<td")[2].split('href="')[1].split('"')[0];
                        }
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
                }
            }
            message += "</ul>";
            if (source == "Following"){
                chrome.storage.sync.set({"following": message});
            } else if (source == "Forums"){
                chrome.storage.sync.set({"forums": message});
            }
            result = "Complete "+source;
        } else {
            if (html.includes('signup-login-box')){
                chrome.storage.sync.set({"login": false});
                if (source == "Following"){
                    chrome.storage.sync.set({"following": "<ul><li>Login required.</li></ul>"});
                } else if (source == "Forums"){
                    chrome.storage.sync.set({"forums": "<ul><li>Login required.</li></ul>"});
                }
                result = "Logon";
            } else {
                postError(source);
                result = "Failure";
            }
        }
        return result;
    })
    .catch(error => {
        console.log(error);
    });
    return fetcher;
}