module.exports = (sequelize, DataTypes) => {
    const Animal = sequelize.define('Animal', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      weight: DataTypes.DECIMAL,
      breed: DataTypes.STRING,
      coatColor: DataTypes.STRING,
      size: DataTypes.STRING,
      species: DataTypes.STRING,
      regIbama: DataTypes.STRING
    }, {
      tableName: 'animals',
      timestamps: false
    });
  
    return Animal;
  }
  