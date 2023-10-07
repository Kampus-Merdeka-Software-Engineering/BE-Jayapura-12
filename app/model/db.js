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

const contacts = connection.define("contacts", {
  id: {
    type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
  },

  nama: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: sequelize.DataTypes.STRING,
  },
  message: {
    type: sequelize.DataTypes.TEXT,
    allowNull: false,
  },

  },{
  timestamps:false,
  freezeTableName: true,
});


module.exports = {
  users,
  connection,
  contacts
}