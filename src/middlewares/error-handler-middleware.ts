import { ErrorRequestHandler } from 'express'

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)

  switch (err.message) {
    case 'InvalidID':
      return res.status(422).json('Provided ID is invalid.')
    case 'jwt malformed':
      return res.status(403).json('Authorization is required.')
    default:
      return res.status(500).json('Internal error.')
  }
}

export default errorHandlerMiddleware
