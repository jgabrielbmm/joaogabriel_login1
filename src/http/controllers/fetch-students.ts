import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FetchUsersUseCase } from '../../use-cases/fetch-users'
import { UserPresenter } from '../presenters/user-presenter'

export async function fetchStudentUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const fetchUsersUseCase = new FetchUsersUseCase(prismaUsersRepository)
  const { users } = await fetchUsersUseCase.execute({ role: 'STUDENT' })

  return reply.status(200).send({ users: users.map(UserPresenter.toHTTP) })
}
