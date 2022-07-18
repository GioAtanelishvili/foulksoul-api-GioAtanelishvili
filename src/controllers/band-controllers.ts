import { RequestHandler } from 'express'
import { Band } from 'models'

import { bandInfoSchema } from 'schemas'

export const editBandInfo: RequestHandler = async (req, res, next) => {
  const { info: bandInfo } = req.body

  const { value: info, error } = bandInfoSchema.validate(bandInfo)

  if (error) {
    return res.status(422).json(error.details)
  }

  try {
    const [prevBand] = await Band.find()

    if (prevBand) {
      const editedBand = Object.assign(prevBand, { info })
      await editedBand.save()
    } else {
      const band = new Band({ info })
      await band.save()
    }

    return res.status(200).json('Band info was updated successfully')
  } catch (err) {
    next(err)
  }
}
