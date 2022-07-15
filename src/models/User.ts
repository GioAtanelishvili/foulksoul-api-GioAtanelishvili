import { Schema, model } from 'mongoose'

export interface IUser {
  nickname: string
  password: string
}

const userSchema = new Schema<IUser>({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model<IUser>('User', userSchema)

export default User
