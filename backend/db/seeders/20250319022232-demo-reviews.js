'use strict';

const { Review } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate( [
      { id: 1,
        spotId: 2,
        userId: 1,
        review: "The beachfront view was absolutely stunning! I didn't want to leave.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        spotId: 2,
        userId: 2,
        review: "Great location, but the waves were a bit too loud at night.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        spotId: 3,
        userId: 3,
        review: "This cabin was the perfect mountain getaway! Super cozy and peaceful.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        spotId: 3,
        userId: 1,
        review: "Nice place, but the road to get there was a bit rough. Still, a great stay!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        spotId: 4,
        userId: 2,
        review: "The future is here. Enjoy the early future while you can!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};