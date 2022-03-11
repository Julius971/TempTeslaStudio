
document.addEventListener("DOMContentLoaded", () => {
    window.parent.addEventListener('message', event => {
        switch (event.data.action) {
            case "openProject":
                openProject(event.data.content);
                return;
            case "newProject":
                newProject();
                return;
            case "saveProject":
                saveProject();
                return;
            default:
                return;
        }
    });
});

function openProject(content) {
    console.log("open", content)
}

function newProject() {
    console.log("new")
}

function saveProject() {
    let output = [
        32, 0,          // offset
        0, 0,           // version
        32, 0,          // headerLength
        48, 0, 0, 0,    // channelCount
        5000,           // frameCount 32bit
        50,             // stepTime
        0,              // flags
        0, 0,           // compressionType
        0, 0,           // futurePlaceholder
        5000,           // timeStamp1 32bit
        0               // timeStamp2 32bit
    ];

    let outputString = "PSEQ" + String.fromCharCode(...output);
    download("project.fseq", outputString);
}

function download(filename, content) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}


function drawTablePrefixes() {
    const ctx = document.getElementById("prefix").getContext("2d");
    ctx.font = '15px serif';
    ctx.fillStyle = "white";
    //ctx.fillText('Hello world', 5, 5);
}

drawTablePrefixes()