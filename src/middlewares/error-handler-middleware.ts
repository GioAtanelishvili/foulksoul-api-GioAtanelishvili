import { ErrorRequestHandler } from 'express'

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)

  const { message } = err

  if (message === 'InvalidID') {
    return res.status(422).json('Provided ID is invalid.')
  } else if (message === 'File too large') {
    return res.status(413).json('Provided file is too large. ')
  } else if (message.includes('jwt')) {
    return res.status(403).json('Authorization is required.')
  } else {
    return res.status(500).json('Internal error.')
  }
}

export default errorHandlerMiddleware
