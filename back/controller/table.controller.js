const Table = require("../models/table.model");

//Tested
exports.tableListAction = (req, res) => {
    Table.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.getOneAction = (req, res) => {
    Table.findOne({ _id: req.params.id })
        .then((table) => res.status(200).json(table))
        .catch((error) => res.status(404).json({ error }));
};

//Tested
exports.addAction = (req, res) => {
    const newTable = new Table(req.body);
    newTable
        .save()
        .then(() => res.status(201).json({ id: newTable._id, message: "Table ajoutée !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.editAction = (req, res) => {
    Table.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then((table) => res.status(200).json({ id: req.params.id, message: "Table modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.deleteAction = (req, res) => {
    Table.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ id: req.params.id, message: "Table supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
};