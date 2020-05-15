'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Product name should not be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Product image should not filled"
        },
        isUrl: {
          msg: "Product image not url type"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "price not in number format"
        },
        isInt: {
          msg: "price should be in integer form/ berbentuk bilangan bulat"
        },
        min: {
          args: [1],
          msg: "Minimum price is Rp.1"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Product stock should be filled"
        },
        isNumeric: {
          msg: "stock not in number format"
        },
        isInt: {
          msg: "stock should be in integer form/ berbentuk bilangan bulat"
        },
      }
    },
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};