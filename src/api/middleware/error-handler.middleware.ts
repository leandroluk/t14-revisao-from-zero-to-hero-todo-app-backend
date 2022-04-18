import { ErrorRequestHandler } from 'express'

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next): void => {
  const { name } = err
  switch (name) {
    default:
      res.sendStatus(500)
  }
}