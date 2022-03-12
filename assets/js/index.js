document.addEventListener("DOMContentLoaded", () => {
    var modal = document.getElementById("popup");
    var frame = document.getElementById("modalFrame");
    var span = document.getElementsByClassName("close")[0];
    
    
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    window.addEventListener('message', event => {
        switch (event.data.action) {
            case "showPopup":
                frame.setAttribute("src", event.data.content);
                modal.style.display = "block";
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
