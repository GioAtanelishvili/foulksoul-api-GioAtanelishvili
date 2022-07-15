import bcrypt from 'bcrypt'
import Joi from 'joi'

import { User, IUser } from 'models'

export const nicknameSchema = Joi.string()
  .required()
  .min(3)
  .alphanum()
  .lowercase()
  .messages({
    'string.base': 'User nickname should be a string.',
    'string.required': 'User nickname is required.',
    'string.min': 'User nickname should be at least 3 chars long.',
    'string.alphanum': 'User nickname should be alphanumeric.',
    'string.lowercase': 'User nickname should contain only lowercase letters.',
  })

export const passwordSchema = Joi.string().required().min(3).messages({
  'string.base': 'Password should be a string.',
  'string.required': 'Password id required.',
  'string.min': 'Password should be at least 3 chars long.',
})

const checkUserValidity =
  (user: IUser | null, isPasswordValid: boolean) =>
  (value: IUser, helpers: Joi.CustomHelpers) => {
    if (user && isPasswordValid) {
      return value
    }

    return helpers.message({
      custom: 'No user was found with such credentials.',
    })
  }

interface UserData {
  nickname: string
  password: string
}

const createUserSchema = async (data: UserData) => {
  const { nickname, password } = data

  let user: IUser | null = null
  let isPasswordValid = false

  if (nickname && password) {
    user = await User.findOne({ nickname })

    if (user) {
      const hashedPassword = user.password
      isPasswordValid = await bcrypt.compare(password, hashedPassword)
    }
  }

  return Joi.object({
    nickname: nicknameSchema,
    password: passwordSchema,
  }).custom(checkUserValidity(user, isPasswordValid))
}

export default createUserSchema
