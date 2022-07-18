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
  editBandInfo,
  uploadBandImage,
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

router
  .route('/band/social-media')
  .post(addSocialMedia)
  .patch(editSocialMedia)
  .delete(deleteSocialMedia)

router.put('/band/info', editBandInfo)

router.put('/band/member/avatar', fileHandlerMiddleware('avatar'), uploadAvatar)
router.put('/band/social-media/icon', fileHandlerMiddleware('icon'), uploadIcon)
router.put('/band/image', fileHandlerMiddleware('image'), uploadBandImage)

export default router
