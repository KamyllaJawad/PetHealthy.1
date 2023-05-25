module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cpf: DataTypes.STRING,
      login: DataTypes.STRING,
      birthdate: DataTypes.DATE
    }, {
      tableName: 'users',
      timestamps: false
    });
  
    return User;
  }