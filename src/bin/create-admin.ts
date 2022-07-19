import promptSync from 'prompt-sync'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Joi from 'joi'

import { nicknameSchema, passwordSchema } from 'schemas'
import { connectMongo } from 'config'
import { Admin } from 'models'

const prompt = promptSync({ sigint: true })

const getInputValue = async (
  question: string,
  schema: Joi.StringSchema
): Promise<string> => {
  const input = prompt(`${question} `)
  const { value, error } = schema.validate(input)

  if (error) {
    const errorMessage = error.details[0].message

    console.log(`Error: ${errorMessage}`)
    return getInputValue(question, schema)
  }

  if (schema === nicknameSchema && (await Admin.findOne({ nickname: value }))) {
    console.log('Error: Admin with such nickname already exists.')
    return getInputValue(question, schema)
  }

  return value
}

;(async () => {
  await connectMongo()

  console.log('Create Admin (press CTRL+C to exit)\n')
  try {
    const nickname = await getInputValue('Enter nickname:', nicknameSchema)
    const password = await getInputValue('Enter password:', passwordSchema)

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = new Admin({ nickname, password: hashedPassword })
    await admin.save()

    console.log('\nAdmin created successfully!')
  } catch (err: any) {
    console.error(err.message)
  } finally {
    mongoose.disconnect()
  }
})()
