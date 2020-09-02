module.exports = (sequelize, DataTypes) => {

  const Ticket = sequelize.define('Ticket', {
    image: DataTypes.STRING,
    summary: DataTypes.TEXT,
    movie: DataTypes.STRING,
    year: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });

  Ticket.associate = function(models) {
    Ticket.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner',
      onDelete: 'CASCADE',
    })
  }

  return Ticket;
};