import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { validateObjectId, extractImagePath, recoverImagePath } from 'utils'
import { bandMemberSchema } from 'schemas'
import { BandMember } from 'models'

const MEMBER_PER_PAGE = 3

export const getAllBandMembers: RequestHandler = async (req, res, next) => {
  const page = Number(req.query.page)
  let bandMembers

  try {
    if (page) {
      bandMembers = await BandMember.find({}, '-__v')
        .skip((page - 1) * MEMBER_PER_PAGE)
        .limit(MEMBER_PER_PAGE)
    } else {
      bandMembers = await BandMember.find({}, '-__v')
    }

    return res.status(200).json(bandMembers)
  } catch (err) {
    next(err)
  }
}

export const addBandMember: RequestHandler = async (req, res, next) => {
  const { value, error } = bandMemberSchema.validate(req.body)

  if (error) {
    return res.status(422).json(error.details)
  }

  const bandMember = new BandMember(value)
  const createdMember = Object.assign(bandMember)

  try {
    await bandMember.save()
    res
      .status(201)
      .json({ message: 'Member was added successfully.', createdMember })
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

export const uploadAvatar: RequestHandler = async (req, res, next) => {
  const { file } = req

  if (!file) {
    return res.status(422).json('Uploaded file is invalid.')
  }

  const { id: bandMemberId } = req.query

  try {
    validateObjectId(bandMemberId as string)

    const bandMember = await BandMember.findById(bandMemberId)

    if (!bandMember) {
      return res.status(404).json("Member with such ID doesn't exist.")
    }

    if (bandMember.avatarPath) {
      const { avatarPath: prevAvatarPath } = bandMember

      const recoveredPath = recoverImagePath(prevAvatarPath)
      await unlink(recoveredPath)
    }

    bandMember.avatarPath = extractImagePath(file.path)
    await bandMember.save()
    return res.status(200).json('Avatar was updated successfully.')
  } catch (err) {
    next(err)
  }
}
