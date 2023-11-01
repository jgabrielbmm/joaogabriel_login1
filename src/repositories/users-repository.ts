import { Prisma, Role, User } from '@prisma/client'

export interface UsersRepository {
  create(user: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findMany(role: Role): Promise<User[]>
}
