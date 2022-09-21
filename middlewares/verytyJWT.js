const jwt = require("jsonwebtoken")

module.exports = {
    verifyJWT: function (req, res, next) {
        const token = req.headers["x-access-token"]?.split(" ")[1]

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.json({
                    isLoggedIn: false,
                    error: "Failed to Authenticate",
                })

                req.user = {}
                req.user.id = decoded.id;
                req.user.email = decoded.email;
                req.user.username = decoded.username;
                req.user.isLoggedIn = true;
                next();

            })
        } else {
            return res.json({ error: "Incorrect token given", isLoggedIn: false })
        }
    }
}