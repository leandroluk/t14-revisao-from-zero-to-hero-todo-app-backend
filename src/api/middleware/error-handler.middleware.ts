import { ErrorRequestHandler } from 'express'

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next): void => {
  const { name, message } = err
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message })
      break
    default:
      res.sendStatus(500)
  }
}