let filter = true;

publish.onsubmit = function () {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/publish", true);

    xhr.send(JSON.stringify({ message: this.elements.message.value }));

    this.elements.message.value = '';

    subscribe();

    return false;
};

if (filter) {
    subscribe();
    filter = false;
}

function subscribe() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/subscribe", true);

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(this.responseText));
        messages.appendChild(li);
    };

    xhr.send(null);
}