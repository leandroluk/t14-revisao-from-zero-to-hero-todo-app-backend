import { AddTodo, Todo } from '../../types'
import { NotFoundError } from '../errors'
import { todosModel } from '../models/todos.model'

export const todosService = {
  async list(): Promise<Todo[]> {
    const result = await todosModel.list()
    return result
  },

  async add(data: AddTodo): Promise<Todo['id']> {
    const id = await todosModel.add(data)
    return id
  },

  async get(id: Todo['id']): Promise<Todo> {
    const todo = await todosModel.get(id)
    if (!todo) throw new NotFoundError('"todo" not found')
    return todo
  }
}