import { Todo } from '../../types'
import { todosService } from '../services'

export const todosController = {
  async list(): Promise<Todo[]> {
    const result = await todosService.list()
    return result
  }
}
