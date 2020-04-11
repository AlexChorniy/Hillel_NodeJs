exports.paramsGetById = (req, res, next) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const isNumber = !isNaN(idNumber);
    if (!isNumber) {
        next("id is not a number");
    } else if (idNumber === 2) {
        next("rout");
    } else {
        next();
    }

};

exports.bodyUpdateMessageValidation = () => {

};