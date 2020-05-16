let filter = true;

publish.onsubmit = function () {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/messages/add", true);

    const senderName = document.getElementsByName('username')[0].innerText || 'userName1';

    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify({
        text: this.elements.message.value,
        sender: senderName,
        id: Date.now(),
        changeTag: true
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
    let DATA = [];

    xhr.open("GET", `/messages`, true);

    xhr.setRequestHeader("content-type", "application/json");

    xhr.onreadystatechange = function () {

        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }
        DATA = JSON.parse(this.responseText);
        document.getElementsByClassName('messages')[0].innerHTML = '';
        if (DATA) {
            DATA.map((data, idx) => {
                return true
                    ? printLiElement('messages', data, idx + 1)
                    : ''
            });
        }
    };
    xhr.send(DATA);
    return false;
};

function update(e) {
    // const attrVal = e.target.parentNode.getAttribute('data-index');
    const unixClass = e.target.parentNode.classList[1];
    const elementValue = document.getElementsByClassName(`btn ${unixClass}`)[0].value;
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/messages/${unixClass}`, true);

    xhr.setRequestHeader("content-type", "application/json");

    xhr.onreadystatechange = function () {

        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }
        const DATA = JSON.parse(this.responseText);
        document.getElementsByClassName('messages')[0].innerHTML = '';
        if (DATA) {
            DATA.map((data, idx) => printLiElement('messages', data, idx + 1));
        }
    };
    xhr.send(JSON.stringify({ updatedTxt: elementValue }));
};

function del(e) {
    const indificatorNum = parseInt(e.target.parentNode.classList[1]);
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/messages/${indificatorNum}`, true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }
        const DATA = JSON.parse(this.responseText);
        document.getElementsByClassName('messages')[0].innerHTML = '';
        if (DATA) {
            DATA.map((data, index) => printLiElement('messages', data, index + 1));
        }
    };
    xhr.send(null);
};

function save(e) {
    const attrVal = e.target.parentNode.getAttribute('data-index');
};

