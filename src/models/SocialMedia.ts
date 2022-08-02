import { Schema, model } from 'mongoose'
import { ISocialMedia } from 'types'

const socialMediaSchema = new Schema<ISocialMedia>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  iconPath: {
    type: String,
    required: false,
    default: '',
  },
})

const SocialMedia = model('SocialMedia', socialMediaSchema)

export default SocialMedia
