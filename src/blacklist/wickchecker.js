function TextByWrapper(ele){
    innertext = "";
    if ((ele.parentNode.nodeName == "P")||(ele.parentNode.nodeName == "LI")){
        innertext = ele.parentNode.innerText;
    } else if ((ele.parentNode.parentNode.nodeName == "P")||(ele.parentNode.parentNode.nodeName == "LI")){
        innertext = ele.parentNode.parentNode.innerText;
    }
    return innertext;
}

async function getPageWicks(link){
    fetcher = await fetch(link)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        if (html.includes("We don't have an article named")){
            return "Invalid";
        } else {
            parser = new DOMParser();
            wrapper = parser.parseFromString(html, "text/html");
            twikilinks = wrapper.getElementsByClassName('twikilink');
            for (var i = 0; i < twikilinks.length; i++){
                wikiword = twikilinks[i].attributes["href"].value.split("pmwiki.php/")[1];
                li = document.createElement("li");
                li.innerHTML = '<a href="https://tvtropes.org/pmwiki/pmwiki.php/'+wikiword+'"></a>';
                console.log('<a href="https://tvtropes.org/pmwiki/pmwiki.php/'+wikiword+'"></a>');
                document.getElementById('wickcheck1').appendChild(li);
                
                innerwikitext = twikilinks[i].innerText;                
                li = document.createElement("li");
                li.innerHTML = TextByWrapper(twikilinks[i]);                
                replacement = TextByWrapper(twikilinks[i]).replace(innerwikitext, '<span class="highlight">'+innerwikitext+"</span>");
                li.innerHTML = replacement;
                li.style.marginLeft = "1em";
                document.getElementById('wickcheck1').appendChild(li);
            }
            document.querySelector('#wickcheck1 h1').innerText = "Pages wicked from the current ("+String(twikilinks.length)+"):";
            return "Valid";            
        }
    })
    .catch(error => {
        console.log(error);
    });
    return fetcher;
}


async function getRelatedContext(link, target, tag){
    fetcher = await fetch(link)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        if (html.includes("Found in 0 articles")){
            return "Invalid";
        } else {
            s1 = html.split(target)[0].split("<br>");
            s1 = s1[s1.length -1];
            s2 = html.split(target)[1].split("<br>")[0];            

            li = document.createElement("li");
            li.innerHTML = s1+'<span class="highlight">'+target+"</span>"+s2;            
            li.style.marginLeft = "1em";
            console.log(document.getElementById(tag));
            document.getElementById(tag).appendChild(li);
        }
    })
    .catch(error => {
        console.log(error);
    });
    return fetcher;
}

async function getRelatedWicks(link){
    fetcher = await fetch(link)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        if (html.includes("Found in 0 articles")){
            return "Invalid";
        } else {
            parser = new DOMParser();
            wrapper = parser.parseFromString(html, "text/html");
            list = wrapper.querySelectorAll('.no-bullets li');
            for (var i = 0; i < list.length; i++){
                rellink = list[i].firstElementChild.attributes["href"].value;                
                wikiword = rellink.split("pmwiki.php/")[1];                
                target = link.split("relatedsearch.php?term=")[1];
                                                
                if (wikiword == null){
                    wikiword = rellink.split("relatedsearch.php?term=")[1];
                }
                li = document.createElement("li");
                li.innerText = wikiword;
                li.id = wikiword;
                document.getElementById('wickcheck2').appendChild(li);
                
                getRelatedContext("https://tvtropes.org/"+rellink+"?action=source", target, wikiword);
            }
            document.querySelector('#wickcheck2 h1').innerText = "Pages wicking to the current ("+String(list.length)+"):";
            return "Valid";            
        }
    })
    .catch(error => {
        console.log(error);
    });
    return fetcher;
}


async function testwicks(){
    input = document.getElementById('input').value;
    document.getElementById('error').innerHTML = "";
    document.getElementById('wickcheck1').innerHTML = "<h1></h1>";
    document.getElementById('wickcheck2').innerHTML = "<h1></h1>";
    if (input.search("/") == -1) {
        input = "Main/"+input;
    }
    
    url = "https://tvtropes.org/pmwiki/pmwiki.php/"+input;
    get = await getPageWicks(url);
    if ((get == "Invalid")||(get === undefined)){
        document.getElementById('error').innerHTML = "Invalid page name!";
    } else {
        document.getElementById('error').innerHTML = "Testing...";
    }
    
    url = "https://tvtropes.org/pmwiki/relatedsearch.php?term="+input;
    get = await getRelatedWicks(url);
    if ((get == "Invalid")||(get === undefined)){
        document.getElementById('error').innerHTML = "Invalid page name!";
    } else {
        document.getElementById('error').innerHTML = "Testing...";
    }
}

document.getElementById("btn").addEventListener("click", testwicks);