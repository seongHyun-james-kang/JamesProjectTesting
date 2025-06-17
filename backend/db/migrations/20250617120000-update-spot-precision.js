'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, check if Users table exists, create if not
    const usersTableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.Users` : 'Users';
      return tables.includes('Users') || tables.includes(tableName);
    });

    if (!usersTableExists) {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING(256),
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

    // Then, check if Spots table exists
    const spotsTableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.Spots` : 'Spots';
      return tables.includes('Spots') || tables.includes(tableName);
    });

    if (!spotsTableExists) {
      // Create Spots table with correct precision from the start
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
      // Table exists, update the column precision
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

    // Finally, check if SpotImages table exists and create if not
    const spotImagesTableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.SpotImages` : 'SpotImages';
      return tables.includes('SpotImages') || tables.includes(tableName);
    });

    if (!spotImagesTableExists) {
      await queryInterface.createTable('SpotImages', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        spotId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Spots',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false
        },
        preview: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
  },

  async down(queryInterface, Sequelize) {
    // Check if table exists before trying to modify it
    const spotsTableExists = await queryInterface.showAllTables().then(tables => {
      const tableName = options.schema ? `${options.schema}.Spots` : 'Spots';
      return tables.includes('Spots') || tables.includes(tableName);
    });

    if (spotsTableExists) {
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