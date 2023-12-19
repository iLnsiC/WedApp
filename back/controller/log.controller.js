const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/admin.model");
const User = require("../models/user.model");

exports.loginAdminAction = (req, res) => {
    AdminUser.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Paire login/mot de passe incorrecte" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ message: "Paire login/mot de passe incorrecte" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id }, // Pour empecher les autres user a faire les CRUD
                            process.env.TOKEN_SECRET,
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.loginAction = (req, res) => {
    User.findOne({ userName: req.body.userName })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "assurez-vous de la syntaxe de votre nom d'utilisateur" });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "24h" }
                ),
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
