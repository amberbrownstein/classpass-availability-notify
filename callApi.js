// WARNING: For POST requests, body is set to null by browsers.
import { XMLHttpRequest } from "xmlhttprequest";

export default function callApi(url, method, headers, data) {
    return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                resolve(this.responseText);
            }
        });

        xhr.open(method, url);

        for (const [key, value] of Object.entries(headers))
            xhr.setRequestHeader(key, value);

        if (data)
            data = JSON.stringify(data);

        xhr.send(data);
    })
}