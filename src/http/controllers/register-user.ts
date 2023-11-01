import { PrismaUsersRepository } from '../../repositories/prisma-users-repository'
import { RegisterUseCase } from '../../use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserPresenter } from '../presenters/user-presenter'

const createUserBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  repeat_password: z.string(),
  role: z.enum(['STUDENT', 'PROFESSOR']),
})

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)
  const { name, username, email, password, repeat_password, role } =
    createUserBodySchema.parse(request.body)

  if (password !== repeat_password) {
    return reply.status(400).send({ message: 'Passwords do not match.' })
  }

  const { user } = await registerUseCase.execute({
    name,
    username,
    email,
    password,
    role,
  })

  reply.status(201).send({ user: UserPresenter.toHTTP(user) })
}
