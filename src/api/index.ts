import express from 'express'
import 'express-async-errors'
import { corsMiddleware, errorHandlerMiddleware } from './middleware'
import { todosRoute } from './routes'

const api = express()

// req middlewares
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(corsMiddleware)

// routes
api.use('/todos', todosRoute)
api.get('/', (_, res) => res.send())

// res middlewares
api.use(errorHandlerMiddleware)

export default api