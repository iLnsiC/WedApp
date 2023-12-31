const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Go to catch if error
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            req.body.thisUser = userId
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("You are not authenticated"),
        });
    }
};