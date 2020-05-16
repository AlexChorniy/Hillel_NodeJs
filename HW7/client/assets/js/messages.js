$('#publish')
    .submit(async (e) => {
        e.preventDefault();
        const message = {
            text: $('input')[0].value,
            sender: $('.user').value,
            id: Date.now(),
            changeTag: true
        };
        $('input')[0].value = "";
        if (message.text.length > 0) {
            const response = await axios.post('/messages/add', message);
            viewMessages(response.data);
        }
    });
let access = true;
const initialRequest = async () => {
    const response = await axios.post('/messages/initial');
    viewMessages(response.data);
    access = false;

};
if (access) {
    initialRequest();
}
function viewMessages(data) {
    $('.messages')[0].innerHTML = '';
    if (data && data.length > 0) {
        data.map((item, idx) => {
            $('<li/>', {
                class: `${item.id || Date.now()}`,
                css: { marginTop: '5px', listStyleType: 'none' },
                'data-index': idx + 1,
                append:
                    $('</>')
                        .add($(item.changeTag ? '<div/>' : '<input/>',
                            {
                                [item.changeTag ? 'text' : 'value']: item.text,
                                css: { marginLeft: '5px' },
                                class: 'btn btn-primary user-text'
                            }))
                        .add($('<div/>',
                            {
                                text: item.sender || "UserName",
                                css: { marginLeft: '5px' },
                                class: 'btn btn-primary user-sender'
                            }))
                        .add($('<button/>',
                            {
                                text: item.changeTag ? 'Изменить' : 'Сохранить',
                                css: { marginLeft: '5px' },
                                class: item.changeTag ? 'btn btn-primary' : 'btn btn-success',
                                on: {
                                    click: async () => {
                                        const response =
                                            await axios.put(`/messages/update/${item.id}`, {
                                                updatedTxt: item.changeTag
                                                    ? item.text
                                                    : $('.user-text')[idx].value
                                            });
                                        viewMessages(response.data);
                                    }
                                }
                            }))
                        .add($('<button/>',
                            {
                                text: 'Удалить',
                                css: { marginLeft: '5px' },
                                class: 'btn btn-danger',
                                on: {
                                    click: async () => {
                                        const response = await axios.delete(`/messages/${item.id}`);
                                        viewMessages(response.data);
                                    }
                                }
                            }))
            },
            ).appendTo('.messages');
        });
    };
};
