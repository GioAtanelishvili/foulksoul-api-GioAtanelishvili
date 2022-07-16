import jwt from 'jsonwebtoken'
import express from 'express'

const authMiddleware: express.Handler = (req, res, next) => {
  const authorization = req.get('Authorization')

  if (!authorization) {
    return res.status(403).send()
  }

  const [, token] = authorization.split(' ')

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as jwt.Secret
    ) as jwt.JwtPayload

    const { userId } = decodedToken
    req.userId = userId
    next()
  } catch (err) {
    next(err)
  }
}

export default authMiddleware
