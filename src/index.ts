const { Sequelize } = require('sequelize');
const { development, test, production } = require('../config/database');

let config;
if (process.env.NODE_ENV === 'development') {
  config = development;
} else if (process.env.NODE_ENV === 'test') {
  config = test;
} else if (process.env.NODE_ENV === 'production') {
  config = production;
} else {
  throw new Error('Node environment not found');
}

const { database, username, password, host, dialect } = config;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => sequelize.close())
  .then(() => {
    console.log('Connection has been closed successfully.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
