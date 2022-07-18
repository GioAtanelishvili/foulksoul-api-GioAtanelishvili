import { Router } from 'express'

import {
  login,
  getAllBandMembers,
  addBandMember,
  editBandMember,
  deleteBandMember,
  uploadAvatar,
  addSocialMedia,
  editSocialMedia,
  deleteSocialMedia,
  uploadIcon,
  getBandDetails,
  editBandInfo,
  uploadBandImage,
} from 'controllers'
import { authMiddleware, fileHandlerMiddleware } from 'middlewares'

const router = Router()

router.post('/login', login)

router.use(authMiddleware)

router.get('/band/members', getAllBandMembers)

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

router.get('/band', getBandDetails)
router.put('/band/info', editBandInfo)

router.put('/band/member/avatar', fileHandlerMiddleware('avatar'), uploadAvatar)
router.put('/band/social-media/icon', fileHandlerMiddleware('icon'), uploadIcon)
router.put('/band/image', fileHandlerMiddleware('image'), uploadBandImage)

export default router
