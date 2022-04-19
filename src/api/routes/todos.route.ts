import { Router } from 'express'
import { todosController } from '../../app/controllers'

const todosRoute = Router()
/*
// editTodo
todosRoute.put('/:id', async (req, res) => {
  res.send(req)
})

// removeTodo
todosRoute.delete('/:id', async (req, res) => {
  res.send(req)
})
*/
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