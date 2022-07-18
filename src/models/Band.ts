import { Schema, model } from 'mongoose'

export interface IBand {
  info: string
  imagePath: string
}

const bandSchema = new Schema<IBand>({
  info: {
    type: String,
    required: false,
  },
  imagePath: {
    type: String,
    required: false,
  },
})

const Band = model('Band', bandSchema)

export default Band
