const sequelize = require('sequelize')
const mysql = require('mysql2')

const connection = new sequelize.Sequelize('revou-jayapura', 'root', 'Teguh0822', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  })

  module.exports = connection