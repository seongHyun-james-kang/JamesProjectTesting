'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fix the precision for lat, lng, and price columns
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.DECIMAL(10, 6), // Changed from (10,7) to (10,6) - allows -999.999999 to 999.999999
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.DECIMAL(11, 6), // Changed to (11,6) - allows -9999.999999 to 9999.999999 for longitude
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'price', {
      type: Sequelize.DECIMAL(10, 2), // Changed to (10,2) - allows up to 99999999.99 for price
      allowNull: false
    }, options);
  },

  async down(queryInterface, Sequelize) {
    // Revert back to original precision
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'price', {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: false
    }, options);
  }
};