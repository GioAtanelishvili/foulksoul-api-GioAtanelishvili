import jwt from 'jsonwebtoken'
import express from 'express'

import { createAdminSchema } from 'schemas'
import { Admin } from 'models'

export const login: express.Handler = async (req, res, next) => {
  try {
    const adminSchema = await createAdminSchema(req.body)
    const { value, error } = adminSchema.validate(req.body)

    if (error) {
      return res.status(422).json(error.details)
    }

    const nickname = value.nickname
    const admin = await Admin.findOne({ nickname })

    const token = jwt.sign(
      { nickname, adminId: admin!._id },
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
