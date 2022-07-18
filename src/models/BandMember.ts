import { Schema, model } from 'mongoose'

export interface IBandMember {
  name: string
  instrument: string
  orbitRadius: number
  color: string
  biography: string
  avatarPath: string
}

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
