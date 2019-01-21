module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
   user_name: {
     type: DataTypes.STRING,
     allowNull: true
   },
   favorite_animals: {
    type: DataTypes.STRING,
    allowNull: true
   }
   
  }, 
  {
    timestamps: false,
  })
  return User
}


