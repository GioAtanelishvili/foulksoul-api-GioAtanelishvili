export const extractImagePath = (path: string) => {
  return path.split('/').slice(2).join('/')
}

export const recoverImagePath = (path: string) => {
  return `build/uploads/${path}`
}
