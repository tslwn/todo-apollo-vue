'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Todos',
      [
        {
          text: 'Buy milk',
          isComplete: false,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Do laundry',
          isComplete: true,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Hoover',
          isComplete: true,
          isArchived: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
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
