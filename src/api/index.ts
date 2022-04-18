import express from 'express'
import { todosRoute } from './routes'

const api = express()

// req middlewares
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

// routes
api.use('/todos', todosRoute)
api.get('/', (_, res) => res.send())

// res middlewares

export default api