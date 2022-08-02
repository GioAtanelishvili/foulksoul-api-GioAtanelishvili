import { Schema, model } from 'mongoose'
import { IAdmin } from 'types'

const userSchema = new Schema<IAdmin>({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const Admin = model<IAdmin>('Admin', userSchema)

export default Admin
