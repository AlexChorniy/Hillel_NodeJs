const { formItem } = require('./formItem');
const { formData } = require('../../../assets/Data');

exports.form = function frm() {
    return `
        <div 
            className="container"
            style="
            display: flex;
            flex-direction: column;
            width: 50%;
            padding: 8px;
            // min-height: 50px;
            background-color: #4682B4;
        ">        
        ${
        formData.map((item, index) => formItem(item, index)).join('')
        }
            <h3
                style="
                    margin: 4px auto 2px auto;
                "
            >Введите текст</h3>
            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: space-between;
                    margin-top: 8px;
                "
            >
                
                <input 
                    class="envelopeTexInput"
                    style="
                        height: 25px;
                        width: 80%;
                    "
                />
                <input
                    type="submit"
                    value="Ответить"
                    onclick="changeDate('answer')"
                />
            </div>
        </div>
    `
};
