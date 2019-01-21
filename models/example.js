module.exports = function (sequelize, DataTypes) {
  var Example = sequelize.define('Example', {
    id:{ 
    type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: DataTypes.TEXT
  })
  return Example
}
