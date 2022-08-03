import { RequestHandler } from 'express'
import { unlink } from 'fs/promises'

import { extractImagePath, recoverImagePath } from 'utils'
import { bandInfoSchema } from 'schemas'
import { BandDetails } from 'models'

export const getBandDetails: RequestHandler = async (_req, res, next) => {
  try {
    const [bandDetails] = await BandDetails.find({}, '-__v')

    return res.status(200).json(bandDetails)
  } catch (err) {
    next(err)
  }
}

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
    const [band = new BandDetails()] = await BandDetails.find()

    if (band.imagePath) {
      const { imagePath: prevImagePath } = band

      const recoveredPath = recoverImagePath(prevImagePath)
      await unlink(recoveredPath)
    }

    band.imagePath = extractImagePath(file.path)
    const { imagePath } = band

    await band.save()
    return res
      .status(200)
      .json({ message: 'Band image was added successfully', imagePath })
  } catch (err) {
    next(err)
  }
}
