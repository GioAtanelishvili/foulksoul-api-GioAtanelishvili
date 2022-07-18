import { join } from 'node:path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, _file, callback) {
    let destination

    switch (req.path) {
      case '/band/member/avatar':
        destination = join('build', 'uploads', 'band-members-avatars')
        break
      case '/band/social-media/icon':
        destination = join('build', 'uploads', 'social-media-icons')
        break
      case '/band/image':
        destination = join('build', 'uploads', 'band-image')
    }

    if (destination) {
      callback(null, destination)
    }
  },
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

const fileHandlerMiddleware = (fieldName: 'avatar' | 'icon' | 'image') => {
  return upload.single(fieldName)
}

export default fileHandlerMiddleware
