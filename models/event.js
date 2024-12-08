'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsToMany(models.User, {
        through: 'user_event',
        foreignKey: 'event_id',
        otherKey: 'user_id',
      });
    }
  }

  Event.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'event',
  });

  return Event;
};