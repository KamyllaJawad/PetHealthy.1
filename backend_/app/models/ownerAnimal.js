module.exports = (sequelize, DataTypes) => {
  const OwnerAnimal = sequelize.define(
    'OwnerAnimal',
    {
      animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    },
    {
      tableName: 'owner_animal',
      timestamps: false
    }
  );

  OwnerAnimal.associate = (models) => {
    OwnerAnimal.belongsTo(models.Animal, {
      foreignKey: 'animal_id',
      as: 'animal'
    });
  };

  return OwnerAnimal;
};
