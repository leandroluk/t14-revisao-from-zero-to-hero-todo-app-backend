import { TodoDAO } from '../../db'
import { Todo } from '../../types'

export const todosModel = {
  async list(): Promise<Todo[]> {
    const result = await TodoDAO.findAll({ raw: true })
    return result as unknown as Todo[]
  }
}