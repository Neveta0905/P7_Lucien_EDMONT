'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    moderated: {type: DataTypes.INTEGER, defaultValue: 0},
  },
  {timestamps: false}
  , {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.User,{
      foreignKey: {
        allowNull: false,
        name: 'users_id'
      }
    })
    
    models.Comment.belongsTo(models.Posts,{
      foreignKey: {
        allowNull: false,
        name: 'posts_id'
      }
    })
  };
  return Comment;
};