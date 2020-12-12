require('dotenv').config();

const Express = require('express');
const app = Express();

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}`));

app.use(Express.static(__dirname + '/public'));
console.log(__dirname);

app.get('/', (req, res) => res.render('index'));

const database = require('./db');
database.sync();

app.use(Express.json());

const user= require('./controllers/usercontroller');
app.use('/user', user)
