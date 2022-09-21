const express = require("express");
const router = express.Router();
const moment = require("moment")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongooseError = require('mongoose-error-beautifier');

// Models
const userDataModel = require("../../models/users")


// Middlewares
const { verifyJWT } = require("../../middlewares/verytyJWT")




/*  ---------------------------------------------  */
/*                    Register                     */
/*  ---------------------------------------------  */
router.post('/add-user', async (req, res) => {
    try {
        const Email = await userDataModel.findOne({ email: req.body.email })
        const Username = await userDataModel.findOne({ username: req.body.username })

        if (Email || Username) {
            return res.json({ msg: "Username or email has already been taken" })

        } else {

            const encryptPassword = await bcrypt.hash(req.body.password, 10)

            await new userDataModel({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: encryptPassword
            })
                .save()
                .then(async (data) => {
                    console.log(data);
                    return res.json({ msg: "Register successfully" })
                })
        }

    } catch (error) {
        console.log(error._message);

        if (error._message == "users validation failed") {
            const errors = mongooseError(error);
            return res.json({ errors })

        } else {
            return res.json({ error: 'system error' })

        }
    }
})




/*  ---------------------------------------------  */
/*                      Login                      */
/*  ---------------------------------------------  */
router.post('/login', async (req, res) => {
    try {
        await userDataModel.find({
            username: req.body.username
        })
            .then(user => {
                console.log(user);
                if (user.length > 0) {

                    bcrypt.compare(req.body.password, user[0].password)
                        .then(isCorrect => {
                            console.log(isCorrect);

                            if (isCorrect) {
                                const payload = {
                                    id: user[0]._id,
                                    email: user[0].email,
                                    username: user[0].username,
                                }

                                jwt.sign(
                                    payload,
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn: 86400
                                    },
                                    (err, token) => {
                                        if (err) return rers.json({ error: err })
                                        return res.json({
                                            msg: "Login successfully",
                                            token: `Bearer ${token}`
                                        })
                                    }
                                )

                            } else {
                                return res.json({ error: "Invalid username or password" })

                            }

                        })

                } else {
                    return res.json({ error: "Invalid username or password" })
                }
            })

    } catch (error) {
        console.log(error);
        return res.json({ error: 'system error' })
    }
})




/*  ---------------------------------------------  */
/*                     Profile                     */
/*  ---------------------------------------------  */
router.get('/profile', verifyJWT, async (req, res) => {
    try {
        await userDataModel.find({
            _id: req.user.id
        }, {
            __v: 0,
            password: 0
        })
            .then(data => {
                console.log(data);
                if (data.length > 0) {
                    return res.json({ data, isLoggedIn: req.user.isLoggedIn })

                } else {
                    console.log("09-09000000000009-09----------");
                    return res.json({ data: [], isLoggedIn: false })
                }
            })

    } catch (error) {
        console.log(error);
        return res.json({ error: 'system error' })
    }
})






module.exports = router;
