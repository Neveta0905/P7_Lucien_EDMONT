'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    topic: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    moderated: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
  },
  {timestamps: false},
    {});
  Posts.associate = function (models) {
    models.Posts.belongsTo(models.User, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false,
        name:'creator_id'
      }
    });
    
    models.Posts.hasMany(models.Comment,{
      foreignKey:
      {name:'posts_id'}
    })
  };
  return Posts;
};