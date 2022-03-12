
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

function setUpCanvas() {
    // get canvas refs
    const wCtx = document.getElementById("waveform").getContext("2d");
    const pCtx = document.getElementById("prefix").getContext("2d");
    const tCtx = document.getElementById("timeline").getContext("2d");

    // get css variable
    const tHeight = getComputedStyle(document.documentElement).getPropertyValue('--tHeight').slice(0, -2);
    const tWidth = getComputedStyle(document.documentElement).getPropertyValue('--tWidth').slice(0, -2);
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--secondaryText');
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--borderColor');

    // 150 x width
    wCtx.canvas.height = 150;
    wCtx.canvas.width = tWidth;

    // height - 150 x 100
    pCtx.canvas.height = tHeight - 150;
    pCtx.canvas.width = 100;

    // height - 150 x width - 100
    tCtx.canvas.height = tHeight - 150;
    tCtx.canvas.width = tWidth - 100;

    // style settings
    wCtx.font = '15px serif';
    wCtx.fillStyle = textColor;
    wCtx.strokeStyle = borderColor;
    wCtx.textAlign = "left";

    pCtx.font = '15px serif';
    pCtx.fillStyle = textColor;
    pCtx.strokeStyle = borderColor;
    pCtx.textAlign = "left";

    tCtx.font = '15px serif';
    tCtx.fillStyle = textColor;
    tCtx.strokeStyle = borderColor;
    tCtx.textAlign = "left";

    return {wCtx, pCtx, tCtx};
}

function draw() {
    const {wCtx, pCtx, tCtx} = setUpCanvas();

    // draw prefix cell
    pCtx.rect(0, 0, 150, 20);
    pCtx.stroke();
    pCtx.fillText("Test", 5, 15);

    // draw waveform cell
    wCtx.rect(101, 130, 20, 20);
    wCtx.stroke();
    wCtx.fillText("0", 107, 145);

    // draw timeline cell
    tCtx.rect(1, 0, 20, 20);
    tCtx.stroke();
}

draw()