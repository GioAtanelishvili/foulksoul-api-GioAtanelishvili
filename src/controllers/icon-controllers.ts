import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { validateObjectId } from 'utils'
import { SocialMedia } from 'models'

export const uploadIcon: RequestHandler = async (req, res, next) => {
  const { file } = req

  if (!file) {
    return res.status(422).json('Uploaded file is invalid.')
  }

  const { id: socialMediaId } = req.query

  try {
    validateObjectId(socialMediaId as string)

    const socialMedia = await SocialMedia.findById(socialMediaId)

    if (!socialMedia) {
      return res.status(404).json("Social media with such ID doesn't exist.")
    }

    if (socialMedia.iconPath) {
      const { iconPath: prevIconPath } = socialMedia
      await unlink(prevIconPath)
    }

    socialMedia.iconPath = file.path
    await socialMedia.save()
    return res.status(200).json('Icon was added successfully.')
  } catch (err) {
    next(err)
  }
}
