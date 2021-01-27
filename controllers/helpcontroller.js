const router = require('express').Router();

const validateSession = require('../middleware/validate-session');

const Help = require('../db').import('../models/help')

/**************************
****CREATE A HELP POST*****
***************************/

router.post('/create', validateSession, (req, res) => {
    console.log(req.body)
    const helpPost = {
        title: req.body.help.title, // Dropdown menu
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date, // I want this to auto populate
        inactiveDate: req.body.help.inactiveDate,
        userId: req.user.id
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
    Help.findAll({ include: ['user'] })
        .then(help => res.status(200).json(help))
        .catch(err => res.status(500).json({ error: err }))
});

/******************************
****EDIT HELP POST BY USER*****
******************************/

router.put('/:username', validateSession, (req, res) => {
    const updateHelpPost = {
        title: req.body.help.title,
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date,
        inactiveDate: req.body.help.inactiveDate,
        userId: req.user.id
    }

    const query = { where: { userId: req.params.userId } };

    Help.update(updateHelpPost, query)
        .then((helpPost) => res.status(200).json(helpPost))
        .catch(err => res.status(500).json({ error: err }))
});

/********************************
****DELETE HELP POST BY USER*****
********************************/

router.delete('/:userId', validateSession, async (req, res) => {
    try {
        const result = await Help.destroy({
            where: { userId: req.params.userId }
        });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


module.exports = router;