import Joi from 'joi'
import { AddTodo } from '../../types'
import { runSchema } from './_validators'

export const todosValidator = {
  async bodyAdd(value: unknown): Promise<AddTodo> {
    const schema = Joi.object<AddTodo>({
      description: Joi.string().required(),
      isDone: Joi.boolean().default(false)
    })

    const result = await runSchema(schema, value)
    return result
  }
}