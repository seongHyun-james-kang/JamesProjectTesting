'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, ensure Users table exists (required for foreign key)
    const usersTableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.Users` : 'Users';
      return tables.includes('Users') || tables.includes(tableName);
    });

    if (!usersTableExists) {
      // Create Users table first
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(256),
          allowNull: false,
          unique: true
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, options);
    }

    // Then, check if the Spots table exists, if not create it
    const tableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.Spots` : 'Spots';
      return tables.includes('Spots') || tables.includes(tableName);
    });

    if (!tableExists) {
      // Create the Spots table with correct precision from the start
      await queryInterface.createTable('Spots', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id"
          },
          onDelete: 'CASCADE',
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lat: {
          type: Sequelize.DECIMAL(10, 6), // Fixed precision
          allowNull: false
        },
        lng: {
          type: Sequelize.DECIMAL(11, 6), // Fixed precision
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(10, 2), // Fixed precision
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, options);
    } else {
      // Table exists, just modify the columns
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
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if table exists before trying to modify it
    const tableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.Spots` : 'Spots';
      return tables.includes('Spots') || tables.includes(tableName);
    });

    if (tableExists) {
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
  }
}; 