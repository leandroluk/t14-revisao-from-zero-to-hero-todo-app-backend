import { Todo } from '../../types'
import { todosModel } from '../models/todos.model'

export const todosService = {
  async list(): Promise<Todo[]> {
    const result = await todosModel.list()
    return result
  }
}