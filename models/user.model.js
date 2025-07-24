const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserModel = sequelize.define('UserModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  rol: {
    type: DataTypes.ENUM('candidate', 'manager'),
    allowNull: false,
    defaultValue: 'candidate',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  previousJobs: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'users',
  timestamps: true
});


module.exports = UserModel;

