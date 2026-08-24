import type { User } from '@prisma/client'

export type UserDTO = {
  email: string
  password: string
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  createUser(user: UserDTO): Promise<User>
  //Created for developer
  findAllUser(): Promise<User[]>
  deleteAllUser(): Promise<void>
}