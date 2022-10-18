const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize: any) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        github_id: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
