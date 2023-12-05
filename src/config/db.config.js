const mySQL = require('mysql');

const connectionString = {
    connectionLimit : 100, 
    host : 'localhost',
    user : 'root',
    password:'',
    database:'bussiness',
    debug:false,
    port: 3306
}

const db = mySQL.createPool(connectionString);

module.exports = {
    db,
}

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//     connectionLimit: 100,
//     debug: false,
//     port: 3306,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'bussiness',
//     dialect: 'mysql', // Specify the dialect
// });

// module.exports = {
//     sequelize,
// };
