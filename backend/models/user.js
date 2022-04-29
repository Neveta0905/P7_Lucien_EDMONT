'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      unique: true,
      isEmail: true,
    },
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    moderated: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    role: DataTypes.INTEGER
  },
  {timestamps: false}
  , {});
  User.associate = function(models) {
    models.User.hasMany(models.Comment,{
      foreignKey:
      {name:'users_id'}
    })
  };
  return User;
};