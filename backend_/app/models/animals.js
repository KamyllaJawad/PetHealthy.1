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
      coat_color: DataTypes.STRING,
      size: DataTypes.STRING,
      species: DataTypes.STRING,
      reg_ibama: DataTypes.STRING
    }, {
      tableName: 'animals',
      timestamps: false
    });
  
    return Animal;
  }
  