let filter = true;

publish.onsubmit = function () {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/messages", true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(JSON.stringify({
        message: this.elements.message.value,
        name: 'UserName',
        time: Date.now(),
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

    xhr.open("GET", "/messages", true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {

        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }
        const DATA = JSON.parse(this.responseText);
        if (DATA) {
            DATA.map((data, index) => DATA.length - 1 === index
                ? printLiElement('messages', data, index + 1)
                : '')
        }
    };

    xhr.send(null);
    return false;
};

function update(e) {
    const attrVal = e.target.parentNode.getAttribute('data-index');
    const timeClass = e.target.parentNode.classList[1];
    const elementValue = document.getElementsByClassName(`btn ${timeClass}`)[0].value;
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "/update", true);

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
    xhr.send(JSON.stringify({ changeTagIndex: attrVal, changeValue: elementValue }));

};

function del(e) {
    // const attrVal = e.target.parentNode.getAttribute('data-index');
    const indificatorNum = parseInt(e.target.parentNode.classList[1]);
    const xhr = new XMLHttpRequest();

    xhr.open("DELETE", "/delete", true);

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

    xhr.send(JSON.stringify({ deleteTagIndex: indificatorNum }));
};

function save(e) {
    const attrVal = e.target.parentNode.getAttribute('data-index');
};

