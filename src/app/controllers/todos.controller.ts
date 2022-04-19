import { Todo } from '../../types'
import { todosService } from '../services'
import { todosValidator } from '../validators'

export const todosController = {
  async list(): Promise<Todo[]> {
    const result = await todosService.list()
    return result
  },

  async add(body: unknown): Promise<Todo> {
    const data = await todosValidator.bodyAdd(body)
    const id = await todosService.add(data)
    const result = await todosService.get(id)
    return result
  }
}