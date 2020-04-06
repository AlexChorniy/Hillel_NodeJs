const printLiElement = (parent, body) => {
    // console.log('elements.js printLiElement', document.getElementsByClassName(parent)[0]);
    const liParent = document.getElementsByClassName(parent)[0];
    const liElementName = 'li';
    const liClassName = 'list-group-item';
    const liExtraClass = body.time || '';
    createElement(liElementName, '', '', '', liParent, liClassName, liExtraClass, body.time);


    const divParent = document.getElementsByClassName(`${liClassName} ${liExtraClass}`)[0];

    true ?
        createElement('div', '', body.message || '-', '', divParent, 'btn', liExtraClass, null)
        :
        printButton(`${liClassName} ${liExtraClass}`, body.message || '-', 'text');

    createElement('div', '', body.time || '', '', divParent, 'btn', liExtraClass, null);
    createElement('div', '', body.name || '-', '', divParent, 'btn', liExtraClass, null);
    printButton(`${liClassName} ${liExtraClass}`, 'Change', 'button', body);
    printButton(`${liClassName} ${liExtraClass}`, 'Delete', 'button', body);
    printButton(`${liClassName} ${liExtraClass}`, 'Save', 'button', body);
};

function printButton(parent, valueName, typeValue, data) {
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
    const btnExtraClass = '';
    createElement(btnElementName, btnAttributes, '', btnListeners, btnParent, btnClassName, btnExtraClass, null);
};

const btnLiClickHandler = (e) => {
    // console.log('elemensts.js btnLiClickHandler', );
    const valueName = e.target.value;
    const actions = {
        Change: () => change(e),
        Delete: () => del(e),
        Save: () => save(e),
    };
    actions[valueName]();

    function change(e) {
        const attrVal = e.target.parentNode.getAttribute('data-index');
        console.log('Change', attrVal);
    };

    function del(e) {
        const attrVal = e.target.parentNode.getAttribute('data-index');
        console.log('Delete', attrVal);
    };

    function save(e) {
        const attrVal = e.target.parentNode.getAttribute('data-index');
        console.log('Save', attrVal);
    };


};