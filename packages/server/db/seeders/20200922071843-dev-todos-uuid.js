'use strict';

// Literal UUIDs are provided so they may be used in tests
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Todos',
      [
        {
          id: '85683357-809d-47c6-b0cf-76866bbe7933',
          text: 'Buy milk',
          isComplete: false,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5f78d0b5-e510-4ee8-a9a1-a9962d2d3a1b',
          text: 'Do laundry',
          isComplete: true,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '37a7fb05-46bb-42a6-897f-2c2e4366f42a',
          text: 'Hoover',
          isComplete: true,
          isArchived: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '37a7fb05-46bb-42a6-897f-2c2e4366f42a',
          text: 'Buy milk',
          isComplete: false,
          isArchived: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
