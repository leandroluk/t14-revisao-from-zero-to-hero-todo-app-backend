import { Todo } from '../../types'
import { TodosService } from '../services'
import { TodosValidator } from '../validators'

export class TodosController {
  constructor(
    private todosValidator: TodosValidator,
    private todosService: TodosService
  ) { }

  async list(): Promise<Todo[]> {
    const result = await this.todosService.list()
    return result
  }

  async add(body: unknown): Promise<Todo> {
    const data = await this.todosValidator.bodyAdd(body)
    const id = await this.todosService.add(data)
    const result = await this.todosService.get(id)
    return result
  }

  async edit(params: unknown, body: unknown): Promise<Todo> {
    const [{ id }, changes] = await Promise.all([
      this.todosValidator.paramsId(params),
      this.todosValidator.bodyEdit(body)
    ])
    await this.todosService.edit(id, changes)
    const result = await this.todosService.get(id)
    return result
  }

  async remove(params: unknown): Promise<void> {
    const { id } = await this.todosValidator.paramsId(params)
    await this.todosService.remove(id)
  }
}