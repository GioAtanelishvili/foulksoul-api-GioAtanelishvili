import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { bandInfoSchema } from 'schemas'
import { BandDetails } from 'models'

export const editBandInfo: RequestHandler = async (req, res, next) => {
  const { info: bandInfo } = req.body

  const { value: info, error } = bandInfoSchema.validate(bandInfo)

  if (error) {
    return res.status(422).json(error.details)
  }

  try {
    const [prevBand] = await BandDetails.find()

    if (prevBand) {
      const editedBand = Object.assign(prevBand, { info })
      await editedBand.save()
    } else {
      const band = new BandDetails({ info })
      await band.save()
    }

    return res.status(200).json('Band info was updated successfully')
  } catch (err) {
    next(err)
  }
}

export const uploadBandImage: RequestHandler = async (req, res, next) => {
  const { file } = req

  if (!file) {
    return res.status(422).json('Uploaded file is invalid.')
  }

  try {
    const [band] =
      (await BandDetails.find()) || new BandDetails({ imagePath: file.path })

    if (band.imagePath) {
      const { imagePath: prevImagePath } = band
      await unlink(prevImagePath)
    } else {
      band.imagePath = file.path
    }

    await band.save()
    return res.status(200).json('Band image was added successfully')
  } catch (err) {
    next(err)
  }
}
