const express = require('express');
const router = express.Router();
const ctrl = require('./messages.controller');
const {
    paramsGetById,
    bodyUpdateMessageValidation
} = require('./messages.validation');

router.get("/messages", ctrl.getMessagesHandler);
router.post("/messages/add", ctrl.addNewMassage);
router.put("/messages/:id",
    paramsGetById,
    bodyUpdateMessageValidation,
    ctrl.updateMassageById
);
router.delete("/messages/:id", paramsGetById, ctrl.deleteMassageById);

module.exports = router;
