'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name should not be empty"
        },
        notNull: {
          msg: "Name should not be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email should not be empty"
        },
        notNull: {
          msg: "Email should not be empty"
        },
      },
      unique: {
        msg: "Email already in use"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password should not be empty"
        },
        notNull: {
          msg: "Password should not be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role should not be empty"
        },
        notNull: {
          msg: "Role should not be empty"
        }
      }
    }
  }, { sequelize });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, saltRounds);
  })


  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};