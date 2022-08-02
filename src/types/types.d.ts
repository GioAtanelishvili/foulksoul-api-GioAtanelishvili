export interface IAdmin {
  nickname: string
  password: string
}

export interface IBandDetails {
  info: string
  imagePath: string
}

export interface IBandMember {
  name: string
  instrument: string
  orbitRadius: number
  color: string
  biography: string
  avatarPath: string
}

export interface ISocialMedia {
  name: string
  url: string
  iconPath: string
}
