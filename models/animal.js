module.exports = function (sequelize, DataTypes) {
  var Animal = sequelize.define('Animal', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    animal_name_common: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    animal_name_scientific: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    threat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    pop: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    habitat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_post: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false
  })
  return Animal
}
