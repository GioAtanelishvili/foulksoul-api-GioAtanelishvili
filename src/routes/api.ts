import { Router } from 'express'

import {
  login,
  addBandMember,
  editBandMember,
  deleteBandMember,
  uploadAvatar,
  addSocialMedia,
  editSocialMedia,
} from 'controllers'
import { authMiddleware, fileHandlerMiddleware } from 'middlewares'

const router = Router()

router.post('/login', login)

router.use(authMiddleware)

router
  .route('/band/member')
  .post(addBandMember)
  .patch(editBandMember)
  .delete(deleteBandMember)

router.post('/band/member/avatar', fileHandlerMiddleware(), uploadAvatar)

router.route('/band/social-media').post(addSocialMedia).patch(editSocialMedia)

export default router
