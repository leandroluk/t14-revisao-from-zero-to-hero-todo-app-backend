import { Sequelize, DataTypes } from 'sequelize'

const makeTodoDAO = (sequelize: Sequelize) => {
  const model = sequelize.define('todos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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