import { Sequelize } from 'sequelize'
import vars from '../vars'
import makeTodoDAO from './todos.dao'

const sequelize = new Sequelize(vars.mysql.uri, {
  dialect: 'mysql'
})

export const TodoDAO = makeTodoDAO(sequelize)

export default sequelize