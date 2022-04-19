import { TodoDAO } from '../../db'
import { AddTodo, Todo } from '../../types'

export const todosModel = {
  async list(): Promise<Todo[]> {
    const result = await TodoDAO.findAll({ raw: true })
    return result as unknown as Todo[]
  },

  async add(data: AddTodo): Promise<Todo['id']> {
    const result = await TodoDAO.create({
      ...data,
      createdAt: new Date()
    }) as any
    return result.id
  },

  async get(id: Todo['id']): Promise<Todo> {
    const result = await TodoDAO.findOne({ where: { id }, raw: true })
    return result as unknown as Todo
  }
}