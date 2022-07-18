import { Schema, model } from 'mongoose'

export interface IBandDetails {
  info: string
  imagePath: string
}

const bandDetailsSchema = new Schema<IBandDetails>({
  info: {
    type: String,
    required: false,
  },
  imagePath: {
    type: String,
    required: false,
  },
})

const BandDetails = model('BandDetails', bandDetailsSchema)

export default BandDetails
