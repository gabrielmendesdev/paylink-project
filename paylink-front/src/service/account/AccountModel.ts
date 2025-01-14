export interface Account {
  id: number
  name: string
  surname: string
  dateBirth: string
  profession: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface CreateAccount {
  name: string
  surname: string
  dateBirth: string
  profession: string
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: number
    name: string
    surname: string
    email: string
    dateBirth: Date
    profession: string
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
  }
  token: string
}
