const router = require('express').Router();

const validateSession = require('../middleware/validate-session');

const Recipient = require('../db').import('../models/recipient')

/*****************************
****CREATE RECIPIENT POST*****
******************************/ 

router.post('/create', validateSession, (req, res) => { 
    console.log(req.body) 
    const recipientPost = { 
        username: req.user.username, // This auto populates
        firstName: req.user.firstName, // This auto populates
        lastInitial: req.user.lastName, // This auto populates; add code to grab first initial only
        owner: req.user.id, // This autopopulates
        title: req.body.help.title,
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date, // I want this to auto populate and format
        inactiveDate: req.body.help.inactiveDate
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

module.exports = router;