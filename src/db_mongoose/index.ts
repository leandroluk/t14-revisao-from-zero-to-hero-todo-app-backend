import { createConnection } from 'mongoose'
import vars from '../vars'
import makeTodoDAO from './todos.dao'
import autoIncrement from 'mongoose-auto-increment'

const connection = createConnection(vars.mongo.uri)
autoIncrement.initialize(connection)

const mongoose: any = {
  connection,
  autoIncrement,
  async authenticate(): Promise<void> {
    if (connection.readyState === 0) {
      throw new Error('mongo deu pau')
    }
  }
}

export const TodoDAO = makeTodoDAO(mongoose)

export default mongoose