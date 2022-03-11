document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('message', event => {
        switch (event.data.action) {
            case "showFAQ":
                window.postMessage({'action': 'log', 'content': "TEST :3"});
                return;
            default:
                console.log("Intercepted Event: ", event.data.action, event.data.content ? "(" + event.data.content + ")" : "");
                return;
        }
    });

    window.addEventListener('beforeunload', function (e) {
        // uncomment for production build:
        //e.preventDefault();
        //e.returnValue = '';
    });
});