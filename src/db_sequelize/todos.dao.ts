import { Sequelize, DataTypes } from 'sequelize'

const makeTodoDAO = (sequelize: Sequelize) => {
  const model = sequelize.define('todos', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(36)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isDone: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE(3)
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE(3)
    }
  }, {
    timestamps: false,
    tableName: 'todos'
  })

  return model
}

export default makeTodoDAO