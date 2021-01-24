const router = require('express').Router();
const User = require("../db").import("../models/user")

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/********************
****USER REGISTER****
*********************/

router.post('/register', (req, res) => {
    User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        username: req.body.user.username,
        zipCode: req.body.user.zipCode,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
    })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.status(200).json({
                user: user,
                message: 'New user created.',
                sessionToken: token
            });
        })
        .catch(err => res.status(500).json({ error: err }));
});

/*****************
****USER LOGIN****
******************/

router.post('/login', function (req, res) {

    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
        .then(function loginSuccess(user) {
            if (user) {

                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {

                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })

                        res.status(200).json({
                            user: user,
                            message: "User successfully logged in!",
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: 'Login failed.' });
                    }
                });
            } else {
                res.status(500).json({ error: 'User does not exist.' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

/*********************
****GET USER POSTS****
**********************/

//THIS IS NOT WORKING!!!

router.get('/myposts', (req, res) => {
    User.findAll({ include: ['recipient', 'help'] })
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json(err))
})


module.exports = router;