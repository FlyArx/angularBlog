export interface IUser {
  email: string
  password: string
  returnSecureToken: boolean
}
export interface IFbAuthResponce {
  idToken: string
  expiresIn: string
}

export interface IPost {
  id?: string
  title: string
  author: string
  date: string
  text: string
  name: string
}

export interface IPostClient {
  id?: string
  title: string
  author: string
  date: Date
  text: string
}


