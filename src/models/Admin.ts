import { Schema, model } from 'mongoose'

export interface IAdmin {
  nickname: string
  password: string
}

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
