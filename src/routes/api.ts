import { Router } from 'express'

import {
  login,
  addBandMember,
  editBandMember,
  deleteBandMember,
  uploadAvatar,
  addSocialMedia,
  editSocialMedia,
  deleteSocialMedia,
  uploadIcon,
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

router.post(
  '/band/member/avatar',
  fileHandlerMiddleware('avatar'),
  uploadAvatar
)

router
  .route('/band/social-media')
  .post(addSocialMedia)
  .patch(editSocialMedia)
  .delete(deleteSocialMedia)

router.post(
  '/band/social-media/icon',
  fileHandlerMiddleware('icon'),
  uploadIcon
)

export default router
