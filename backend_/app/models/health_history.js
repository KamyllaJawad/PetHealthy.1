module.exports = (sequelize, DataTypes) => {
  const HealthHistory = sequelize.define(
    "HealthHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      fk_event_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fk_animal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "health_history",
      timestamps: true,
    }
  );
  return HealthHistory;
};
