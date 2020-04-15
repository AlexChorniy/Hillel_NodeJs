exports.getMessagesHandler = (req, res, next) => {
    const { messages } = res.app.locals;
    const newMessage = messages.map(
        ({ text, sender, id, changeTag, updatedAt }) => ({ text, sender, id, changeTag, updatedAt })
    );
    res.app.locals.messages = newMessage;
    res.status(200).send(newMessage);
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
            // console.log('mes.ctrl updateMassageById', mes);
            mes.changeTag = !mes.changeTag;
            if (mes.changeTag) {
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

    res.app.locals.messages =
        [
            ...messages,
            { text, sender, id, changeTag }
        ];

    res.status(200).json(messages);
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
