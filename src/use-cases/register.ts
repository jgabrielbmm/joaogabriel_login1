import { Role, User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  username: string
  email: string
  password: string
  role: Role
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    username,
    email,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      passwordHash,
      role,
    })

    return { user }
  }
}
