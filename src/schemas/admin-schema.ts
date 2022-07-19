import bcrypt from 'bcrypt'
import Joi from 'joi'

import { Admin, IAdmin } from 'models'

export const nicknameSchema = Joi.string()
  .required()
  .min(3)
  .trim()
  .alphanum()
  .lowercase()
  .messages({
    'string.base': 'Admin nickname should be a string.',
    'string.required': 'Admin nickname is required.',
    'string.min': 'Admin nickname should be at least 3 chars long.',
    'string.alphanum': 'Admin nickname should be alphanumeric.',
    'string.lowercase': 'Admin nickname should contain only lowercase letters.',
  })

export const passwordSchema = Joi.string().required().trim().min(3).messages({
  'string.base': 'Password should be a string.',
  'string.required': 'Password id required.',
  'string.min': 'Password should be at least 3 chars long.',
})

const checkAdminValidity =
  (admin: IAdmin | null, isPasswordValid: boolean) =>
  (value: IAdmin, helpers: Joi.CustomHelpers) => {
    if (admin && isPasswordValid) {
      return value
    }

    return helpers.message({
      custom: 'No admin was found with such credentials.',
    })
  }

interface AdminData {
  nickname: string
  password: string
}

const createAdminSchema = async (
  data: AdminData
): Promise<Joi.ObjectSchema> => {
  const { nickname, password } = data

  let admin: IAdmin | null = null
  let isPasswordValid = false

  if (nickname && password) {
    admin = await Admin.findOne({ nickname })

    if (admin) {
      const hashedPassword = admin.password
      isPasswordValid = await bcrypt.compare(password, hashedPassword)
    }
  }

  return Joi.object({
    nickname: nicknameSchema,
    password: passwordSchema,
  }).custom(checkAdminValidity(admin, isPasswordValid))
}

export default createAdminSchema
