const router = require('express').Router();
const User = require("../db").import("../models/user")

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/******************
****USER REGISTER**
*******************/

router.post('/register', (req, res) => {
    User.register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        zipCode: req.body.zipCode,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
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
 

module.exports = router;