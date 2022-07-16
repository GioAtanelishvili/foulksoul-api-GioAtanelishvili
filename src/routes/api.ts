import { Router } from 'express'

import { login, addBandMember } from 'controllers'
import { authMiddleware } from 'middlewares'

const router = Router()

router.post('/login', login)

router.use(authMiddleware)

router.route('/band/member').post(addBandMember)

export default router
