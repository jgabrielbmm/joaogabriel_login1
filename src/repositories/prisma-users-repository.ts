import { Prisma, Role } from '@prisma/client'
import { prisma } from '../prisma'
import { UsersRepository } from './users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(user: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: {
        ...user,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findMany(role?: Role) {
    return await prisma.user.findMany({
      where: {
        role,
      },
    })
  }
}
