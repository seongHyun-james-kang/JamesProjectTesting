//demo-review-images.js

'use strict';

const { ReviewImage } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,  // Make sure this ID exists in the Reviews table
        url: "https://www.constructionspecifier.com/wp-content/uploads/2023/07/ankrom-moisan-mass-timber-building-ai-rendering-1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 2,  // Make sure this ID exists in the Reviews table
        url: "https://cwimages.imgix.net/BuildingImages/Ashworth2023/AW-Ext-03.jpg?auto=compress",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 3,
        url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ], options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ReviewImages", null, {});
  },
};