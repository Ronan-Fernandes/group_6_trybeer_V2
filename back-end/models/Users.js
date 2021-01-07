const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.belongsTo(models.sale, { as: 'sale', foreignKey: 'user_id' });
  };
  return User;
};
module.exports = Users;
