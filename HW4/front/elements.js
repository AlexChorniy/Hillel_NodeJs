const printLiElement = (parent, body, index) => {
    const liParent = document.getElementsByClassName(parent)[0];
    const liElementName = 'li';
    const liClassName = 'list-group-item';
    const liExtraClass = `${body.time}`;
    createElement(liElementName, '', '', '', liParent, liClassName, liExtraClass, index);


    const divParent = document.getElementsByClassName(`${liClassName} ${liExtraClass}`)[0];

    body.changeTag ?
        createElement('div', '', body.message || '-', '', divParent, 'btn', liExtraClass, null)
        :
        printButton(`${liClassName} ${liExtraClass}`, body.message || '-', 'text', liExtraClass);

    createElement('div', '', dayToday(), '', divParent, 'btn', liExtraClass, null);
    createElement('div', '', body.name || '-', '', divParent, 'btn', liExtraClass, null);
    printButton(`${liClassName} ${liExtraClass}`, 'Change/Save', 'button');
    printButton(`${liClassName} ${liExtraClass}`, 'Delete', 'button');
    // printButton(`${liClassName} ${liExtraClass}`, 'Save', 'submit');
};

const dayToday = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const date = `${month < 10 ? `0${month}` : month}:${day < 10 ? `0${day}` : day}:${year}`;
    return date;
};

function printButton(parent, valueName, typeValue, extraClass) {
    const btnParent = document.getElementsByClassName(parent)[0];
    const btnElementName = 'input';
    const btnAttributes = [{
        key: 'type',
        value: typeValue,
    },
    {
        key: 'value',
        value: valueName,
    },
    ];
    const btnListeners = [{
        type: 'click',
        handler: btnLiClickHandler,
    }];
    const btnClassName = 'btn';
    const btnExtraClass = extraClass;
    createElement(btnElementName, btnAttributes, '', btnListeners, btnParent, btnClassName, btnExtraClass, null);
};

const btnLiClickHandler = (e) => {
    const valueName = e.target.value;
    const actions = {
        'Change/Save': () => update(e),
        Delete: () => del(e),
        Save: () => save(e),
    };
    actions[valueName] && actions[valueName]();
};