exports.paramsGetById = (req, res, next) => {
    const { id } = req.params;
    console.log('paramsGetById', req.params);
    const idNumber = Number(id);
    const isNumber = !isNaN(idNumber);
    if (!isNumber) {
        next("id is not a number");
    } else {
        req.params.id = idNumber;
        next();
    }

};

exports.bodyUpdateMessageValidation = () => {
    //TODO
    next();
};