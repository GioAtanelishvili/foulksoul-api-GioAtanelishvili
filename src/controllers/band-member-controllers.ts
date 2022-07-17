import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { bandMemberSchema } from 'schemas'
import { validateObjectId } from 'utils'
import { BandMember } from 'models'

export const addBandMember: RequestHandler = async (req, res, next) => {
  const { value, error } = bandMemberSchema.validate(req.body)

  if (error) {
    return res.status(422).json(error.details)
  }

  const bandMember = new BandMember({ ...value, userId: req.userId! })

  try {
    await bandMember.save()
    res.status(201).json('Member was added successfully.')
  } catch (err) {
    next(err)
  }
}

export const editBandMember: RequestHandler = async (req, res, next) => {
  const { id: bandMemberId } = req.query

  const { value: data, error } = bandMemberSchema.validate(req.body)

  if (error) {
    return res.status(422).json(error.details)
  }

  try {
    validateObjectId(bandMemberId as string)

    const bandMember = await BandMember.findById(bandMemberId)

    if (!bandMember) {
      return res.status(404).json("Member with such ID doesn't exist.")
    }

    const editedBandMember = Object.assign(bandMember, data)
    await editedBandMember.save()
    return res.status(200).json('Member was updated sucessfully.')
  } catch (err) {
    next(err)
  }
}

export const deleteBandMember: RequestHandler = async (req, res, next) => {
  const { id: bandMemberId } = req.query

  try {
    validateObjectId(bandMemberId as string)

    const bandMember = await BandMember.findByIdAndDelete(bandMemberId)

    if (!bandMember) {
      return res.status(404).json("Member with such ID doesn't exist.")
    }

    const { avatarPath } = bandMember

    if (avatarPath) {
      await unlink(avatarPath)
    }

    return res.status(200).json('Member was deleted successfully')
  } catch (err) {
    next(err)
  }
}
