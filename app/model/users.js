const connection = require("./index")
const sequelize = require("sequelize")
// const { DataTypes} = require("sequelize")

const users = connection.define("users", {
    id: {
    type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    nama: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    },
    pass: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    },
    image: {
    type: sequelize.DataTypes.STRING,
  }},{
    freezeTableName: true,  // Prevents Sequelize from pluralizing the table name
    timestamps: false       // Disables the "createdAt" and "updatedAt" columns
});

module.exports = users