import express from 'express'

import { bandMemberSchema } from 'schemas'
import { BandMember } from 'models'

export const addBandMember: express.Handler = async (req, res, next) => {
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
