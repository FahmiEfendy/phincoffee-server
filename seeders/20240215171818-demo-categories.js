"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: "coffee",
          name: "Coffee",
          description: "Enjoy a variety of coffee drinks",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048539/image/icons/hds3ghknt3luispv3act.png",
          image_id: "image/icons/hds3ghknt3luispv3act",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "latte",
          name: "Latte",
          description: "Indulge in creamy and flavorful lattes",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048581/image/icons/c0eqvvp7aaohputjxjyd.jpg",
          image_id: "image/icons/c0eqvvp7aaohputjxjyd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "espresso",
          name: "Espresso",
          description: "Experience the bold taste of espresso shots",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048594/image/icons/qovbzijfrvx74zptda1c.jpg",
          image_id: "image/icons/qovbzijfrvx74zptda1c",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cappuchino",
          name: "Cappuchino",
          description: "Savor the perfect blend of espresso and frothed milk",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048608/image/icons/wu0j1mqqtshqbjjxbrci.jpg",
          image_id: "image/icons/wu0j1mqqtshqbjjxbrci",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "mocha",
          name: "Mocha",
          description:
            "Delight in the rich combination of chocolate and coffee",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048622/image/icons/bcywedwpeahn73hv2uht.png",
          image_id: "image/icons/bcywedwpeahn73hv2uht",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "sandwich",
          name: "Sandwich",
          description: "A variety of delicious sandwiches for every taste",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048636/image/icons/mlqlk6i2c6pkbk2stxmm.jpg",
          image_id: "image/icons/mlqlk6i2c6pkbk2stxmm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "salad",
          name: "Salad",
          description: "Fresh and healthy salads to satisfy your cravings",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048733/image/icons/jwiecsm4sjfh0trla4rx.jpg",
          image_id: "image/icons/jwiecsm4sjfh0trla4rx",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "pizza",
          name: "Pizza",
          description: "Authentic pizzas with a perfect blend of flavors",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048659/image/icons/tbtpyttgd1nowky5ps6p.jpg",
          image_id: "image/icons/tbtpyttgd1nowky5ps6p",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "burger",
          name: "Burger",
          description: "Juicy and delicious burgers for a hearty meal",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048670/image/icons/ocpqeuiaucmvqcxi0uh6.jpg",
          image_id: "image/icons/ocpqeuiaucmvqcxi0uh6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dessert",
          name: "Dessert",
          description: "Indulge in sweet treats and delightful desserts",
          image_url:
            "http://res.cloudinary.com/dfbcal2eb/image/upload/v1708048682/image/icons/swvtc2miwgm23rij3lqt.jpg",
          image_id: "image/icons/swvtc2miwgm23rij3lqt",
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
