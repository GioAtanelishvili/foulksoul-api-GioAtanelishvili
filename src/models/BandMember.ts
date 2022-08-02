import { Schema, model } from 'mongoose'
import { IBandMember } from 'types'

const bandMemberSchema = new Schema<IBandMember>({
  name: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  orbitRadius: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  avatarPath: {
    type: String,
    required: false,
    default: '',
  },
})

const BandMember = model<IBandMember>('BandMember', bandMemberSchema)

export default BandMember
