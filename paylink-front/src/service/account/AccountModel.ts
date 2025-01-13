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
