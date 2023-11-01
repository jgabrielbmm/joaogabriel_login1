import { Role, User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface FetchUsersUseCaseRequest {
  role: Role
}

interface FetchUsersUseCaseResponse {
  users: User[]
}

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    role,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany(role)
    return { users }
  }
}
