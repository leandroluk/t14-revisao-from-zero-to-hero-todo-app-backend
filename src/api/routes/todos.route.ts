import { Router } from 'express'
import { makeTodosController } from '../../app/factories'

const todosRoute = Router()
const todosController = makeTodosController()

// editTodo
todosRoute.put('/:id', async (req, res) => {
  const result = await todosController.edit(req.params, req.body)
  res.json(result)
})


// removeTodo
todosRoute.delete('/:id', async (req, res) => {
  await todosController.remove(req.params)
  res.sendStatus(204)
})

// listTodo
todosRoute.get('/', async (_, res) => {
  const result = await todosController.list()
  res.json(result)
})

// addTodo
todosRoute.post('/', async (req, res) => {
  const result = await todosController.add(req.body)
  res.status(201).json(result)
})

export { todosRoute }