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
    //TODO
    next();
};