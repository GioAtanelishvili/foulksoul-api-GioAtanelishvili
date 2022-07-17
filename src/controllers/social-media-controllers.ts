import { RequestHandler } from 'express'

import { socialMediaSchema } from 'schemas'
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
