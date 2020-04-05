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
};

function subscribe() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/subscribe", true);

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            setTimeout(subscribe, 500);
            return;
        }
        // create li element
        const liParent = document.getElementById('messages');
        const liClassName = 'list-group-item';
        const liExtraClass = '';
        createElement('li', '', this.responseText, '', liParent, liClassName, liExtraClass);
        const btnParent = document.getElementsByClassName('list-group-item')[0];
        const btnElementName = 'input';
        const btnAttributes = [{
            key: 'type',
            value: 'button',
        },
        {
            key: 'value',
            value: "Изменить",
        },
        ];
        const btnListeners = [{
            type: 'click',
            handler: informationBtnClickHandler,
        }];
        const btnClassName = 'btn btn-primary';
        const btnExtraClass = '';
        const cleanElem = document.getElementsByClassName(btnClassName)[0];
        if (cleanElem) {
            cleanElem.remove();
        }
        createElement(btnElementName, btnAttributes, '', btnListeners, btnParent, btnClassName, btnExtraClass);

    };

    xhr.send(null);
};
