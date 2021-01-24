const router = require('express').Router();

const validateSession = require('../middleware/validate-session');

const Recipient = require('../db').import('../models/recipient')

/*****************************
****CREATE RECIPIENT POST*****
******************************/

router.post('/create', validateSession, (req, res) => {
    console.log(req.body)
    const recipientPost = {
        title: req.body.help.title,
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date, // I want this to auto populate and format
        inactiveDate: req.body.help.inactiveDate,
        userId: req.user.id
    }

    Recipient.create(recipientPost)
        .then(recipient => {
            res.json({
                recipient: recipient,
                message: "Post created successfully.",
            })
        })
        .then(recipient => res.status(200).json(recipient))
        .catch(err => res.status(500).send(err))
});

/********************************
****VIEW ALL RECIPIENT POSTS*****
********************************/

router.get("/", (req, res) => {
    Recipient.findAll()
        .then(recipient => res.status(200).json(recipient))
        .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;