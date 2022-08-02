import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { extractImagePath, recoverImagePath, validateObjectId } from 'utils'
import { socialMediaSchema } from 'schemas'
import { SocialMedia } from 'models'

export const getSocialMedia: RequestHandler = async (_req, res, next) => {
  try {
    const socialMedia = await SocialMedia.find({}, '-__v')

    return res.status(200).json(socialMedia)
  } catch (err) {
    next(err)
  }
}

export const addSocialMedia: RequestHandler = async (req, res, next) => {
  const { value: data, error } = socialMediaSchema.validate(req.body)

  if (error) {
    return res.status(422).json(error.details)
  }

  const socialMedia = new SocialMedia(data)
  const { _id, name, url } = Object.assign(socialMedia)

  try {
    await socialMedia.save()
    return res.status(201).json({
      message: 'Social media was added successfully.',
      createdSocialMediaItem: { _id, name, url },
    })
  } catch (err) {
    next(err)
  }
}

export const editSocialMedia: RequestHandler = async (req, res, next) => {
  const { id: socialMediaId } = req.query

  const { value: data, error } = socialMediaSchema.validate(req.body)

  if (error) {
    return res.status(422).json(error.details)
  }

  try {
    validateObjectId(socialMediaId as string)

    const socialMedia = await SocialMedia.findById(socialMediaId)

    if (!socialMedia) {
      return res.status(404).json("Social media with such ID doesn't exists.")
    }

    const editedSocialMedia = Object.assign(socialMedia, data)
    await editedSocialMedia.save()
    return res.status(200).json('Social media was updated successfully.')
  } catch (err) {
    next(err)
  }
}

export const deleteSocialMedia: RequestHandler = async (req, res, next) => {
  const { id: socialMediaId } = req.query

  try {
    validateObjectId(socialMediaId as string)

    const socialMedia = await SocialMedia.findByIdAndDelete(socialMediaId)

    if (!socialMedia) {
      return res.status(404).json("Social media with such ID doesn't exists.")
    }

    const { iconPath } = socialMedia

    if (iconPath) {
      const recoveredPath = recoverImagePath(iconPath)
      await unlink(recoveredPath)
    }

    return res.status(200).json('Social media was deleted successfully.')
  } catch (err) {
    next(err)
  }
}

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

      const recoveredPath = recoverImagePath(prevIconPath)
      await unlink(recoveredPath)
    }

    socialMedia.iconPath = extractImagePath(file.path)
    const { iconPath } = socialMedia

    await socialMedia.save()
    return res.status(200).json({
      message: 'Icon was updated successfully.',
      iconPath,
    })
  } catch (err) {
    next(err)
  }
}
