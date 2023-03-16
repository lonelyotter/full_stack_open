const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "reading_list",
  }
);

module.exports = ReadingList;
