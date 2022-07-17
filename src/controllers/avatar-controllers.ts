import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { BandMember } from 'models'
import { validateObjectId } from 'utils'

export const uploadAvatar: RequestHandler = async (req, res, next) => {
  const { file } = req

  let statusCode = 201
  let message = 'Avatar was added successfully.'

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
      statusCode = 200
      message = 'Avatar was updated successfully.'

      const { avatarPath: prevAvatarPath } = bandMember
      await unlink(prevAvatarPath)
    }

    bandMember.avatarPath = file.path
    await bandMember.save()
    return res.status(statusCode).json(message)
  } catch (err) {
    next(err)
  }
}
