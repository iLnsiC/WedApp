const User = require("../models/user.model");

//Tested
exports.userListAction = (req, res) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.getOneAction = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((work) => res.status(200).json(work))
        .catch((error) => res.status(404).json({ error }));
};

exports.getBySkill = async (req, res) => {
    const skillId = req.params.skill;
    try {
        const works = await User.find();
        const workBySkill = works.filter((work) => {
            return work.technicalStack.some((stack) => stack.skillId === skillId);
        });
        res.status(200).json(workBySkill);
    } catch (error) {
        res.status(400).json({ error });
    }
};

//Tested
exports.addAction = (req, res) => {
    const newUser = new User(req.controledBody);
    newUser
        .save()
        .then(() => res.status(201).json({ message: "Projet ajoutée !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.editAction = (req, res) => {
    //Tested
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then((work) => res.status(200).json({ message: "Objet enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.deleteAction = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
};