const User = require("../models/user.model");
const { generateFromEmail } = require("unique-username-generator");

//Tested
exports.userListAction = (req, res) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.getOneAction = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};

//Tested
exports.addAction = (req, res) => {
    req.body.email = req.body.email.toLowerCase()
    req.body.userName = generateFromEmail(
        req.body.email,
        3
    );

    req.body.isPresent = {
        reception: false,
        cityHall: false,
        cityHallValidatedBy: null,
        receptionValidatedBy: null,
    };

    const newUser = new User(req.body);
    newUser
        .save()
        .then(() => res.status(201).json({ message: "Invité ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.editAction = async (req, res) => {
    if (req.body.email) req.body.email = req.body.email.toLowerCase()
    if (req.body.isPresent) {
        const user = await User.findOne({ _id: req.params.id });
        const oldIsPresent = user.isPresent;
        for (var key in req.body.isPresent) {
            oldIsPresent[key] = req.body.isPresent[key];
        }
        req.body.isPresent = oldIsPresent
    }

    //Tested
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then((user) => res.status(200).json({ message: "Invité modifié !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.deleteAction = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Invité supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
};