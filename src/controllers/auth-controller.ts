import jwt from 'jsonwebtoken'
import express from 'express'

import { createUserSchema } from 'schemas'
import { User } from 'models'

export const login: express.Handler = async (req, res, next) => {
  try {
    const userSchema = await createUserSchema(req.body)
    const { value, error } = userSchema.validate(req.body)

    if (error) {
      return res.status(422).json(error.details)
    }

    const nickname = value.nickname
    const user = await User.findOne({ nickname })

    const token = jwt.sign(
      { nickname, userId: user!._id },
      process.env.JWT_SECRET as jwt.Secret,
      {
        expiresIn: '1h',
      }
    )

    return res.status(200).json({ token })
  } catch (err) {
    next(err)
  }
}
