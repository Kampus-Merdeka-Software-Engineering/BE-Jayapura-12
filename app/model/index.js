const sequelize = require('sequelize')
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const connection = new sequelize.Sequelize("mysql://avnadmin:AVNS_JdQ1fcfZHRMiJSsc6UC@mysql-group12-group12.aivencloud.com:20580/defaultdb?ssl-mode=REQUIRED", {
    ssl: fs.readFileSync(path.join(__dirname,'../../mysql-group12 ca.pem')),
    dialect: 'mysql',
    logging: false,
  })

  module.exports = connection