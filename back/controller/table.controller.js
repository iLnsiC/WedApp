const Table = require("../models/table.model");
const User = require("../models/user.model");

//Not Tested
exports.tableListAction = (req, res) => {
    Table.find()
        .then((tables) => {
            tables.forEach((table, i) => {
                let userData = [];
                User
                    .find({ table: table._id })
                    .then( users => {
                        users.forEach(user => {
                            userData.push({
                                id: user._id,
                                name: user.firstName + ' ' + user.lastName,
                                family: user.family
                            })
                        });
                    })
                    .catch((error) => res.status(404).json({ error }));
                table.users = userData;
                table.placeLeft = table.place - userData.length;
                tables[i] = table;
            });
            res.status(200).json(tables)
        })
        .catch((error) => res.status(400).json({ error }));
};

//Not Tested
exports.getOneAction = (req, res) => {
    Table.findOne({ _id: req.params.id })
        .then((table) => res.status(200).json(table))
        .catch((error) => res.status(404).json({ error }));
};

//Not Tested
exports.addAction = (req, res) => {
    const newTable = new Table(req.body);
    newTable
        .save()
        .then(() => res.status(201).json({ id: newTable._id, message: "Table ajoutée !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Not Tested
exports.editAction = (req, res) => {
    Table.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then((table) => res.status(200).json({ id: req.params.id, message: "Table modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Not Tested
exports.deleteAction = (req, res) => {
    Table.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ id: req.params.id, message: "Table supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
};