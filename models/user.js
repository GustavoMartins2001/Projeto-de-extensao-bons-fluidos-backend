'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Event, {
        through: 'user_event', 
        foreignKey: 'user_id',  
        otherKey: 'event_id',   
      });

      User.hasMany(models.UserContact, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    superUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    supporter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });

  return User;
};