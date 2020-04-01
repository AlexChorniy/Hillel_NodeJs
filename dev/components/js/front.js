function changeData(inputAct, id, index) {
    const actions = {
        'change': () => changeItemRequest(inputAct, id, index),
        'delete': () => deleteItemRequest(inputAct, id, index),
        'answer': () => answer(inputAct),
    };
    actions[inputAct]();
};
function answer(inputAct) {
    const tagValue = document.getElementsByClassName('envelopeTexInput')[0].value;
    console.log(inputAct);
};

function changeItemRequest(inputAct, id, index) {
    console.log(inputAct, id, index);
};

function deleteItemRequest(inputAct, id, index) {
    console.log(inputAct, id, index);
};
