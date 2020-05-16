exports.getMessagesHandler = (req, res, next) => {
    const { messages } = res.app.locals;
    const newMessage = messages.map(
        ({ text, sender, id, changeTag, updatedAt }) => ({ text, sender, id, changeTag, updatedAt })
    );
    res.app.locals.messages = newMessage;
    res.status(200).json(newMessage);
    next();
};

exports.getMessageById = (req, res, next) => {
    const { messages } = res.app.locals;
    const { id } = req.params;
    if (!message) {
        return next({ code: 404, message: 'note found' });
    }
    res.status(200).send(messages.find(message => message.id === id));
    next();
};

exports.updateMassageById = (req, res, next) => {
    const { messages } = res.app.locals;
    const { updatedTxt } = req.body;
    const { id } = req.params;
    const message = messages.map(mes => {
        if (mes.id === id) {
            mes.changeTag = !mes.changeTag;
            if (mes.changeTag) {
                console.log('updateMassageById', updatedTxt);
                mes.text = updatedTxt;
                Object.assign(mes, { updatedAt: Date.now() });
            };
        }
        return mes;
    });
    if (!message) {
        return next({ code: 404, message: 'note found' });
    }
    res.app.locals.messages = message;
    res.status(200).json(message);
    next();
};

exports.addNewMassage = (req, res, next) => {
    const { messages } = res.app.locals;
    const { text, sender, id, changeTag } = req.body;
    if (text.length > 0) {
        res.app.locals.messages =
            [
                ...messages,
                { text, sender, id, changeTag }
            ];
        res.status(200).json(res.app.locals.messages);
    }
    next();
};

exports.deleteMassageById = (req, res, next) => {
    let { messages } = res.app.locals;
    const { id } = req.params;
    if (!messages) {
        return next({ code: 404, message: 'note found' });
    }
    const newMessages = messages.filter(mes => mes.id !== id);
    res.app.locals.messages = newMessages;
    res.status(200).json(newMessages);
    next();
};

exports.sortMasseges = (req, res, next) => {
    const { sort = 'addedAt', sortValue = 'desc', limit = 10, skip = 0 } = req.query;
    let { messages } = res.app.locals;
    let newMessages = [];
    const sortingOptions = {
        text: () => messages.sort((a, b) => sortValue === 'asc' ? sortTextAsc(a.text, b.text) : sortTextDesc(a.text, b.text)),
        id: () => messages.sort((firstNum, secondNum) => sortValue === 'asc' ? secondNum.id - firstNum.id : firstNum.id - secondNum.id),
        sender: () => messages.sort((a, b) => sortValue === 'asc' ? sortTextAsc(a.sender, b.sender) : sortTextDesc(a.sender, b.sender)),
        addedAt: () => messages.sort((a, b) => sortValue === 'asc' ? sortTextAsc(a.addedAt, b.addedAt) : sortTextAsc(a.addedAt, b.addedAt)),
    };
    const sortTextAsc = (a, b) => {
        if (a < b) return -1
    };
    const sortTextDesc = (a, b) => {
        if (a > b) return -1
    };

    if (sortingOptions[sort]) {
        newMessages = sortingOptions[sort]();
    } else {
        // next({ code: 404, message: 'wrong query' });
        console.log('wrong query');
    }
    // console.log('sortMasseges', newMessages);
    res.app.locals.messages = newMessages;
    res.status(200).json(newMessages);
    next();
};
