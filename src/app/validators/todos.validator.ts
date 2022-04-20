import Joi from 'joi'
import { AddTodo, EditTodo, Indexable } from '../../types'
import { runSchema } from './_validators'

export class TodosValidator {
  async paramsId(value: unknown): Promise<Indexable> {
    const schema = Joi.object<Indexable>({
      id: Joi.number().required().positive().integer(),
    })

    const result = await runSchema(schema, value)
    return result
  }

  async bodyAdd(value: unknown): Promise<AddTodo> {
    const schema = Joi.object<AddTodo>({
      description: Joi.string().required(),
      isDone: Joi.boolean().default(false)
    })

    const result = await runSchema(schema, value)
    return result
  }

  async bodyEdit(value: unknown): Promise<EditTodo> {
    const schema = Joi.object<EditTodo>({
      description: Joi.string(),
      isDone: Joi.boolean()
    })

    const result = await runSchema(schema, value)
    return result
  }
}