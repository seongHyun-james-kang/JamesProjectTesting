"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.Review,{
        foreignKey: "reviewId",
        onDelete:"CASCADE"
      })
    }
  }
  ReviewImage.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Reviews", // Ensure this matches your table name
          key: "id",
        },
        onDelete: "CASCADE",
      },
      
      url: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:true,
          isUrl: true,
        }
      },
    },
    {
      sequelize,
      modelName: "ReviewImage",
      tableName: "ReviewImages"
    }
  );
  return ReviewImage;
};
