const router = require('express').Router();

const validateSession = require('../middleware/validate-session');

const Help = require('../db').import('../models/help')

/**************************
****CREATE A HELP POST*****
***************************/ 

router.post('/create', validateSession, (req, res) => { 
    console.log(req.body) 
    const helpPost = { 
        username: req.user.username, // Double check that this populates
        firstName: req.user.firstName, // Double check that this populates
        lastInitial: req.user.lastName, // Double check that this populates; add code to grab first initial only
        owner: req.user.id, // Double check that this populates
        title: req.body.help.title,
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date,
        inactiveDate: req.body.help.inactiveDate
    }

    Help.create(helpPost) 
        .then(help => {
            res.json({ 
                help: help,
                message: "Post created successfully.",
            })
        })
        .then(help => res.status(200).json(help)) 
        .catch(err => res.status(500).send(err)) 
});




module.exports = router;