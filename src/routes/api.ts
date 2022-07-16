import { Router } from 'express'

import {
  login,
  addBandMember,
  editBandMember,
  deleteBandMember,
} from 'controllers'
import { authMiddleware } from 'middlewares'

const router = Router()

router.post('/login', login)

router.use(authMiddleware)

router
  .route('/band/member')
  .post(addBandMember)
  .patch(editBandMember)
  .delete(deleteBandMember)

export default router
