const Sequelize= require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, _// <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION_ 
      },
    },
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
