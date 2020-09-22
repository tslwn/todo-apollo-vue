'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Install extension to generate UUIDs
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    // Remove ID column
    await queryInterface.removeColumn('Todos', 'id');
    // Add UUID column as primary key
    await queryInterface.addColumn('Todos', 'id', {
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
      type: Sequelize.UUID,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Remove UUID column
    await queryInterface.removeColumn('Todos', 'id');
    // Add ID column as primary key
    await queryInterface.addColumn('Todos', 'id', {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    });
  },
};
