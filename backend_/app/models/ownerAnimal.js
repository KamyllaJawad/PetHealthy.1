module.exports = (sequelize, DataTypes) => {
    const OwnerAnimal = sequelize.define('OwnerAnimal', {
      animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
      
    }, {
      tableName: 'owner_animal',
      timestamps: false
    });
  
    return OwnerAnimal;
  }
  