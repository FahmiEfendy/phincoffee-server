"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Espresso",
          description: "Black Coffee",
          price: 18000,
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1707977795/f7e7gpbsqqblndbvkura.png",
          category_id: "espresso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Latte",
          description: "Coffee with creamer",
          price: 20000,
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1707989618/h5tgmsyxluay0mbde7cr.png",
          category_id: "latte",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chocolate",
          description: "Chocolate Hot/Ice",
          price: 22000,
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1707987709/xbrzdlfizs5u3nmccbef.png",
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
