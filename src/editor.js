function regexAppend(r1, r2){
    var or_op = /|/;
    var r = new RegExp(r1.source + or_op.source + r2.source, "g");
    return r;
}
document.querySelector(".highLite_editable").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
});
document.querySelector(".highLite_editable").addEventListener('input', function() {
    var el = document.querySelector(".highLite_editable");
    const regex_wikiword = /([A-Z][a-z]+)([A-Z][a-z]*)*([A-Z][a-z]+)/;
    const regex_wikiword2 = /(\{\{.+\}\})/;
    const regex_wikiword3 = /([A-Z][a-z]+)+\/([A-Z][a-z]+)([A-Z][a-z]*)*([A-Z][a-z]+)/;
    const regex_wikiword4 = /([A-Z][a-z]+)+\/(\{\{.+\}\})/;
    regex_wikiwords = regexAppend(regex_wikiword, regex_wikiword2);
    regex_wikiwords = regexAppend(regex_wikiwords, regex_wikiword3);
    regex_wikiwords = regexAppend(regex_wikiwords, regex_wikiword4);
    const regex_spoiler = /\[\[spoiler:.*?\]\]/g;
    const regex_techical = /(\[\[quoteright:.*?\]\])|(\[\[caption.*?\]\])/g;
    const regex_weblink = /\[\[http.*?\]\]/g;
    const regex_comment = /%%.*/g;
    el.previousElementSibling.innerHTML = el.innerHTML
    .replace(regex_wikiwords, "<span class='wikiword'>$&</span>")
    .replace(regex_spoiler, "<span class='spoiler'>$&</span>")
    .replace(regex_techical, "<span class='technical'>$&</span>")
    .replace(regex_weblink, "<span class='weblink'>$&</span>")
    .replace(regex_comment, "<span class='comment'>$&</span>");
});