document.addEventListener("DOMContentLoaded", () => {
    window.parent.addEventListener('message', event => {
        switch (event.data.action) {
            case "log":
                document.getElementById("logLabel").innerHTML = "Status: " + event.data.content;
                return;
            default:
                return;
        }
    });
});

function zoom(value) {
    document.getElementById("zoom").title = "Timeline Zoom (" + value + ")";
    window.parent.postMessage({'action': "zoom", 'content': value}, "*");
}

function sendAction(action) {
    window.parent.postMessage({'action': action}, "*");
}