import { join } from 'node:path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: join('build', 'uploads'),
  filename(_req, file, callback) {
    const uniqueSuffix = Date.now()
    const fileName = uniqueSuffix + file.originalname

    callback(null, fileName)
  },
})

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const mimeTypeRegexp = /^image\/(png|jpg|jpeg)$/

  if (mimeTypeRegexp.test(file.mimetype)) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({ storage, fileFilter })

const fileHandlerMiddleware = () => {
  return upload.single('avatar')
}

export default fileHandlerMiddleware
