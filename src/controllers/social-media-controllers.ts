import { RequestHandler } from 'express'

import { socialMediaSchema } from 'schemas'
import { validateObjectId } from 'utils'
import { SocialMedia } from 'models'

export const addSocialMedia: RequestHandler = async (req, res, next) => {
  const { value: data, error } = socialMediaSchema.validate(req.body)

  if (error) {
    return res.status(422).json(error.details)
  }

  try {
    const socialMedia = new SocialMedia(data)
    await socialMedia.save()
    return res.status(201).json('Social media was added successfully.')
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
    return res.status(200).json('Social media was updated successflly.')
  } catch (err) {
    next(err)
  }
}
