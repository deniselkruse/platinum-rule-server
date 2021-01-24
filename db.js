const Sequelize= require('sequelize');

const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, 
{
    host: 'localhost',
    dialect: 'postgres'
});
 
database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err=> console.log(err));
 
User = database.import('./models/user');
Recipient = database.import('./models/recipient');
Help = database.import('./models/help');


User.hasMany(Recipient, {foreignKey: "userId"});
Recipient.belongsTo(User, {foreignKey: "userId"});

User.hasMany(Help, {foreignKey: "userId"});
Help.belongsTo(User, {foreignKey: "userId"});


module.exports = database;
