exports.messageController = (data) => {
    let messages = [];

    const controller = {
        change: '',
        delete: '',
        answer: data ? messages = [...messages, { id: 1, text: data && data.text, date: new Date(), changeTag: true }] : [...messages],
    };
    const obj = data && data.action
    controller[obj];
    return messages;
}