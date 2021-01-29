const router = require('express').Router();
const sequelize = require ('sequelize');

const validateSession = require('../middleware/validate-session');

const Recipient = require('../db').import('../models/recipient')

/****************************
****CREATE REQUEST POST******
*****************************/

router.post('/create', validateSession, (req, res) => {
    console.log(req.body)
    const recipientPost = {
        title: req.body.recipient.title,
        description: req.body.recipient.description,
        availability: req.body.recipient.availability,
        // {availability: sequelize.fn('array_append', sequelize.col('availability'), req.body.recipient.availability)},
        instances: req.body.recipient.instances,
        date: req.body.recipient.date, // I want this to auto populate and format
        inactiveDate: req.body.recipient.inactiveDate,
        userId: req.user.id
    }

    Recipient.create(recipientPost, {availability: sequelize.fn('array_append', sequelize.col('availability'), req.body.recipient.availability)})
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
****VIEW ALL REQUEST POSTS*******
********************************/

router.get("/", (req, res) => {
    Recipient.findAll({ include: ['user'] })
        .then(recipient => res.status(200).json(recipient))
        .catch(err => res.status(500).json({ error: err }))
});

/*********************************
****EDIT REQUEST POST BY USER*****
**********************************/

router.put('/:username', validateSession, (req, res) => {
    const updateRecipientPost = {
        title: req.body.help.title,
        description: req.body.help.description,
        availability: req.body.help.availability,
        instances: req.body.help.instances,
        date: req.body.help.date,
        inactiveDate: req.body.help.inactiveDate,
        userId: req.user.id
    }

    const query = { where: { userId: req.params.userId } };

    Recipient.update(updateRecipientPost, query)
        .then((recipientPost) => res.status(200).json(recipientPost))
        .catch(err => res.status(500).json({ error: err }))
});

/***********************************
****DELETE REQUEST POST BY USER*****
************************************/

router.delete('/:userId', validateSession, async (req, res) => {
    try {
        const result = await Recipient.destroy({
            where: { userId: req.params.userId }
        });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;