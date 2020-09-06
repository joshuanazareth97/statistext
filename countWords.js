chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, selection => {
    let data;
    if ((selection && selection[0] === "") || !selection) {
        data = "No text selected."
    } else {
        data = computeStats(selection[0])
        loadData(data)
    }
});

function computeStats(text) {
    const counter = count(text);
    return `<p className="data">${counter("chars")} characters</p>
    <p className="data">${counter("alphabets")} characters (A-Z)</p>
    <p className="data">${counter("words")} words</p>
    <p className="data">${counter("sents")} sentences</p>
    <p className="data">${counter("paras")} paragraphs</p>
    `
}

function count(text) {
    return (metric) => {
        switch (metric) {
            case "chars":
                return text.replace("\n", "").length;
            case "alphabets":
                return text.replace(/[^A-Za-z]/g, "").length;
            case "words":
                return text.split(/\s+\b/g).length;
            case "sents":
                return text.split(/\.+\s+/g).length
            case "paras":
                return text.split(/\.+\n+/g).length
            default:
                throw Error('Provide a valid metric from ["chars", "words", "sents", "paras"]')
        }
    }
}

function loadData(data) {
    const elem = document.querySelector(".text p")
    const errorElem = document.querySelector(".empty");
    errorElem.style.display = "none";
    elem.innerHTML = data;
}