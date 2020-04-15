const printLiElement = (parent, body, index) => {
    const liParent = document.getElementsByClassName(parent)[0];
    const liElementName = 'li';
    const liClassName = 'list-group-item';
    const liExtraClass = `${body.id}`;
    createElement(liElementName, '', '', '', liParent, liClassName, liExtraClass, index);

    const divParent = document.getElementsByClassName(`${liClassName} ${liExtraClass}`)[0];
    const timeCtrl = body.changeTag && body.updatedAt || body.id;
    body.changeTag
        ? createElement('div', '', body.text || '-', '', divParent, 'btn', liExtraClass, null)
        : printButton(`${liClassName} ${liExtraClass}`, body.text || '-', 'text', liExtraClass);
    createElement('div', '', dayToday(timeCtrl, !!body.updatedAt), '', divParent, 'btn', liExtraClass, null);
    createElement('div', '', body.sender || '-', '', divParent, 'btn', liExtraClass, null);
    printButton(`${liClassName} ${liExtraClass}`, 'Change/Save', 'button');
    printButton(`${liClassName} ${liExtraClass}`, 'Delete', 'button');
    // printButton(`${liClassName} ${liExtraClass}`, 'Save', 'submit');
};

const addZero = num => num < 10 ? `0${num}` : num;

const dayToday = (unixDate, isEntered = false) => {
    const newDate = unixDate || Date.now();
    const day = new Date(newDate).getDate();
    const month = new Date(newDate).getMonth() + 1;
    const year = new Date(newDate).getFullYear();
    const hours = new Date(newDate).getHours();
    const minutes = new Date(newDate).getMinutes();
    const seconds = new Date(newDate).getSeconds();
    const date = `${isEntered ? 'entered' : ''} ${addZero(month)}:${addZero(day)}:${addZero(year)} time ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
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