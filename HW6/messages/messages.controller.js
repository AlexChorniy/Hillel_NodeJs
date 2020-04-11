exports.getMessagesHandler = (req, res) => {
    // res.send(req.app.locals.messages);
    res.status(203).sendFile(__filename);
};

exports.getMessageById = (req, res) => {
    res.end(JSON.stringify(req.params));
};

exports.updateMassageById = (req, res) => { };

exports.addNewMassage = (req, res) => { };

exports.deleteMassageById = (req, res) => { };
