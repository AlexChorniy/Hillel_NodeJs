const { form } = require('./form');

exports.main = function root() {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.0//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd">
    <html lang="en" style="height: 100%;">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home work 4</title>
    </head>
    
    <body style="background-color: grey; margin: 0; padding: 0; height: 100%;">
        <div className="wrapper" 
            style="
                height: 100%;
                background-color: #B0C4DE;
                padding: 10px;                
                display: flex;
                justify-content: center;
            "
        >
            ${form()}
        </div>
        <script>
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
        </script>            
    </body>
    
    </html>
    `
};
