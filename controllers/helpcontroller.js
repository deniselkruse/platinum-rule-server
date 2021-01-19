const router = require('express').Router();

const validateSession = require('../middleware/validate-session');

const Help = require('../db').import('../models/help')

/**************************
****CREATE A HELP POST*****
***************************/ 

router.post('/create', validateSession, (req, res) => { 
    console.log(req.body) 
    const helpPost = { 
        username: req.user.username, // This auto populates
        firstName: req.user.firstName, // This auto populates
        lastInitial: req.user.lastName, // This auto populates; add code to grab first initial only
        owner: req.user.id, // Double check that this populates
        title: req.body.help.title, // Dropdown menu
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date, // I want this to auto populate
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

/**************************
****VIEW ALL HELP POSTS*****
***************************/ 

router.get("/", (req, res) => {
    helpPost.findAll()
        .then(help => res.status(200).json(help))
        .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;