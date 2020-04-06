let filter = true;

publish.onsubmit = function () {
    const xhr = new XMLHttpRequest();
    //console.log("main.js publish", this.elements);
    xhr.open("POST", "/publish", true);

    xhr.send(JSON.stringify({
        message: this.elements.message.value,
        name: 'UserName',
        time: Date.now()
    }));

    this.elements.message.value = '';

    subscribe();

    return false;
};

if (filter) {
    subscribe();
    filter = false;
};

function subscribe() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/subscribe", true);

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }
        // console.log('main.js subscribe:', this.responseText);
        printLiElement('messages', JSON.parse(this.responseText));
    };

    xhr.send(null);
};
