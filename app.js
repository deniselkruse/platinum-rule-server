require('dotenv').config();

const express = require('express');
const app = express();

const sequelize = require('./db');
sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));

/* CONTROLLERS */
const user = require('./controllers/usercontroller');
const help = require('./controllers/helpcontroller');
const recipient = require('./controllers/recipientcontroller');


/* MODELS */
app.use('/user', user);
app.use('/help', help);
app.use('/recipient', recipient);

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}`));