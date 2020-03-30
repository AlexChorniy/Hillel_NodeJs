function changeDate(inputAct, id, index) {
    const actions = {
        'change': () => console.log(inputAct, id, index),
        'delete': () => console.log(inputAct, id, index),
        'answer': () => answer(inputAct),
    };
    actions[inputAct]();
};
function answer(inputAct) {
    console.log(inputAct, document.getElementsByClassName('envelopeTexInput')[0].value);
    // document.getElementById("field2").value = document.getElementById("field1").value;
};
