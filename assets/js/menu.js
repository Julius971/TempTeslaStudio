function sendAction(action) {
    window.parent.postMessage({'action': action}, "*");
}

function showPopup(url) {
    window.parent.postMessage({'action': "showPopup", content: url}, "*");
}

function openFile() {
    document.getElementById("hiddenUpload").click();
}

document.getElementById("hiddenUpload").addEventListener("change", (event) => {
    let file = event.target.files[0];
    if (!file) { return; }

    let reader = new FileReader();
    reader.onload = (e) => {
        window.parent.postMessage({'action': 'openProject', 'content': e.target.result})
    };
    reader.onerror = (error) => { console.error(error); }
    reader.readAsText(file);
}, false)