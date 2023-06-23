module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        event_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, {
        tableName: 'event_type',
        timestamps: false,
      });
    return Event;
}


