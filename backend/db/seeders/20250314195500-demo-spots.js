'use strict';
const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        ownerId: 1,
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Cozy Apartment',
        description: 'Best place to enjoy the city.',
        price: 150.00
      },
      {
        id: 2,
        ownerId: 2,
        address: '456 Ocean Ave',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Condo',
        description: 'Wake up to the sound of waves crashing on the shore.',
        price: 140.00
      },
      {
        id: 3,
        ownerId: 3,
        address: '789 Mountain Rd',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain Cabin',
        description: 'Become one with mountain.',
        price: 175.00
      },
      {
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
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {});
  }
};
