exports.paramsGetById = (req, res, next) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const isNumber = !isNaN(idNumber);
    if (!isNumber) {
        next("id is not a number");
    } else {
        req.params.id = idNumber;
        next();
    }

};

exports.bodyUpdateMessageValidation = (req, res, next) => {
    console.log('mes.val.js bodyUpdateMessageValidation', req.body);
    if (typeof req.body !== 'string') {
        return next({ code: 404, message: 'type of message must be a string' });
    }
    next();
};