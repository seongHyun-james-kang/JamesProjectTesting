'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Force update the Spots table columns to fix precision
    try {
      await queryInterface.changeColumn('Spots', 'lat', {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: false
      }, options);
    } catch (error) {
      console.log('lat column update failed or already correct:', error.message);
    }

    try {
      await queryInterface.changeColumn('Spots', 'lng', {
        type: Sequelize.DECIMAL(11, 6),
        allowNull: false
      }, options);
    } catch (error) {
      console.log('lng column update failed or already correct:', error.message);
    }

    try {
      await queryInterface.changeColumn('Spots', 'price', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }, options);
    } catch (error) {
      console.log('price column update failed or already correct:', error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    // Revert back to original precision if needed
    try {
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
    } catch (error) {
      console.log('Rollback failed:', error.message);
    }
  }
};