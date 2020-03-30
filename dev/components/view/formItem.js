exports.formItem = function frmItm(
    data = [
        {
            text: '',
            date: '',
            style: false
        }
    ], index) {
    const { text, date, style, id, changeTag = true } = data;
    return `
        <div
            style="
                display: flex;
                justify-content: ${style ? style.justifyContent : 'flex-start'};
                margin-top: 6px;
            "
        >
            <form 
                className="envelope${!index ? '' : index}"
                method="get"
                action=""
                style="
                    background-color: #AFEEEE;
                    border-radius: 2px;
                    width: 50%;
                    min-height: 50px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 8px;
                "
            >
                <div
                    className="envelopeNameWrapper"
                    style="
                        height: 50%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    "
                >
                    <input 
                        type="button" 
                        value="Изменить"
                        onclick="changeDate('change', ${id}, ${index})"
                    >
                    <input 
                        type="submit"
                        value="Сохранить"
                    >
                   <input 
                        type="button" 
                        value="Удалить"
                        onclick="changeDate('delete', ${id}, ${index})"
                    >
                </div>
                <div
                    className="envelopeTextWrapper"
                    style="
                        height: 50%;
                        width: 100%;
                        justify-content: space-between;
                        padding-top: 8px;
                    "
                >   
        ${
        changeTag
            ?
            `
                <div
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    "
                >${text}</div>
            `
            :
            `
                <input 
                    type="text" 
                    value="${text}"
                    style="
                        width: 100%;
                    "
                    // size="34"
                >
            `
        }
                    
                    <div
                        style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-top: 5px;
                        "
                    >Date:${date}</div>
                </div>                
            </form>
        </div>
    `
};
