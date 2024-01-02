const nodemailer = require('nodemailer')
const User = require("../models/user.model");
const { generateFromEmail } = require("unique-username-generator");

//Tested
exports.userListAction = (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
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
        .then(() => res.status(200).json({ message: "Invité modifié !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.deleteAction = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Invité supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Tested
exports.sendInvitation = (req, res) => {
    const { ids } = req.body;
    let mailOptions = {
        from: process.env.GMAIL_USER,
        subject: "Invitation Au Mariage d'Emilie et Walid",
    }
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PWD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let status = [];
    const payload = ids ? { _id: { $in: ids } }: null
    User.find(payload)
    .then(async (users) => {
        await users.forEach(async (user) => {
            mailOptions.to = user.email
            mailOptions.html = 
            `
                <div style="color: black">
                    <p>${user.firstName} ${user.lastName}, Vous êtes convié a la cérémonie de mariage d'Emilie Coussot et de Walid Zeghoudi.</p>
                    <p>Pour plus de détails veuillez vous connecter avec votre identifiant « <b>${user.userName}</b> » sur le lien suivant: <a href="https://www.zeghoudi-mohammed-walid.fr/">Lien du site</a></p>
                    <p>Une fois connecter vous devez confirmer votre présence ainsi que celle des membres de votre familles s'ils rencontres des difficulté a le faire par eux même</p>
                    <p>Si vous rencontrer des diffuclté répondez directement a ce mail en détaillant la problématique rencontrée.</p>
                    <p>Au plaisir de vous acceuillir. Cordialement Émilie et Walid</p>
                </div>
            `
            await transporter.sendMail(mailOptions, (error, info) => {
                const statusData = {
                    to: user.email
                }
                if (error) {
                    statusData.send = false
                    statusData.info = error
                    console.error(error)
                } else {
                    statusData.send = true
                    statusData.info = info.response
                }
                status.push(statusData)
              });
        });
        res.status(200).json(status)
    })
    .catch((error) => res.status(400).json({ error }));
}