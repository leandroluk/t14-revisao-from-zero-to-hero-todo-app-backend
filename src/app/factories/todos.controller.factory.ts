import { TodosController } from '../controllers'
import { TodosModel } from '../models/todos.model'
import { TodosService } from '../services'
import { TodosValidator } from '../validators'

export function makeTodosController(): TodosController {
  const todosValidator = new TodosValidator()
  const todosModel = new TodosModel()
  const todosService = new TodosService(todosModel)
  const result = new TodosController(todosValidator, todosService)
  return result
}