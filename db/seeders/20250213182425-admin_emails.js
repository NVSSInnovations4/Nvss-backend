'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('admin_emails', [
      { email: 'gudisanarasimha@gmail.com', name: 'Narasimha', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { email: 'raghunaveen59@gmail.com', name: 'Raghu', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { email: 'suryasolasa666@gmail.com', name: 'surya', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { email: 'vijayakanth.tech@gmail.com', name: 'vijay', role: 'admin', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admin_emails', null, {});
  },
};