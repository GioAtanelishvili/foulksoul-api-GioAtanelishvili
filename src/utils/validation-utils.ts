import { Types } from 'mongoose'

export const validateObjectId = (id?: string) => {
  if (id && !Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID')
  }
}
