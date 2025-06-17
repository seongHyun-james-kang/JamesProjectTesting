'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if spot with id 4 exists; if not, create it
    const existing = await Spot.findByPk(4, options);
    if (!existing) {
      await Spot.create({
        id: 4,
        ownerId: 1,
        address: '2077 Edgerunner',
        city: 'Night City',
        state: 'NJ',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'CyberPunk',
        description: 'Step into the future and become one with Vi',
        price: 1000
      }, options);
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, { id: 4 }, {});
  }
}; 