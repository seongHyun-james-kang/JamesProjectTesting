'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the existing Spots table columns to fix precision
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.DECIMAL(11, 6),
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'price', {
      type: Sequelize.DECIMAL(10, 2),
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