const express = require('express');
const router = express.Router();
const ctrl = require('./messages.controller');
const {
    paramsGetById,
    bodyUpdateMessageValidation
} = require('./messages.validation');


router.post("/messages/add", ctrl.addNewMassage);
router.post("/messages/initial", ctrl.getMessagesHandler);
router.put("/messages/update/:id",
    paramsGetById,
    bodyUpdateMessageValidation,
    ctrl.updateMassageById
);
router.delete("/messages/:id", paramsGetById, ctrl.deleteMassageById);
router.post("/messages", ctrl.sortMasseges);
router.get("/ ?*", (req, res, next) => {
    const render_obj = {
        title: "Title HW7",
        userName: "UserName1",
        time: `Current time ${Date.now()}`
    };
    res.render("index.nj", render_obj);
    next();
});

module.exports = router;
