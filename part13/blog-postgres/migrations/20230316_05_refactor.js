const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blog_reading_lists");
    await queryInterface.dropTable("reading_lists");
  },
};
