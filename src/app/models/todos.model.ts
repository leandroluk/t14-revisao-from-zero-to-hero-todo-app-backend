import crypto from 'crypto'
// import { TodoDAO } from '../../db_sequelize'
import { TodoDAO } from '../../db_mongoose'
import { AddTodo, EditTodo, Todo } from '../../types'

export class TodosModel {
  async list(): Promise<Todo[]> {
    // const result = await TodoDAO.findAll({ raw: true })
    const result = await TodoDAO.find({ raw: true }, '-_id')
    return result as unknown as Todo[]
  }

  async add(data: AddTodo): Promise<Todo['id']> {
    const id = crypto.randomUUID()
    // const result = await TodoDAO.create({ id, ...data, createdAt: new Date() }) as any
    const result = await TodoDAO.create({ id, ...data, createdAt: new Date() })
    return result.id
  }

  async get(id: Todo['id']): Promise<Todo> {
    // const result = await TodoDAO.findOne({ where: { id }, raw: true })
    const result = await TodoDAO.findOne({ id }, '-_id')
    return result as unknown as Todo
  }

  async edit(id: Todo['id'], changes: EditTodo): Promise<void> {
    // await TodoDAO.update({ ...changes, updatedAt: new Date() }, { where: { id } })
    await TodoDAO.findOneAndUpdate({ id }, { ...changes, updatedAt: new Date() })
  }

  async remove(id: Todo['id']): Promise<void> {
    // await TodoDAO.destroy({ where: { id } })
    await TodoDAO.findOneAndRemove({ id })
  }
}