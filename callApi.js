// WARNING: For POST requests, body is set to null by browsers.
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function callApi(url, method, data) {
    return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                resolve(this.responseText);
            }
        });

        xhr.open(method, url);
        //xhr.setRequestHeader("CP-Authorization", `Token ${token}`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));
    })
}

module.exports = {callApi};