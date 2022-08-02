import { Schema, model } from 'mongoose'
import { IBandDetails } from 'types'

const bandDetailsSchema = new Schema<IBandDetails>({
  info: {
    type: String,
    required: false,
    default: '',
  },
  imagePath: {
    type: String,
    required: false,
    default: '',
  },
})

const BandDetails = model('BandDetails', bandDetailsSchema)

export default BandDetails
