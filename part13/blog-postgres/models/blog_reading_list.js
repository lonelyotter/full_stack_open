const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class BlogReadingList extends Model {}

BlogReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
    },
    reading_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "reading_lists",
        key: "id",
      },
    },
    unread: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog_reading_list",
  }
);

module.exports = BlogReadingList;
