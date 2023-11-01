import {UsersRepository} from "./users-repository";
import {Prisma, Role, User} from "@prisma/client";
import {randomUUID} from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(user: Prisma.UserCreateInput) {
    const data = {
      id: randomUUID(),
      name: user.name,
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role
    }

    this.items.push(data)

    return data
  }

  async findByEmail(email: string){
      const user = this.items.find((item) => item.email === email)

      if (!user) {
        return null
      }

      return user
  }

  async findMany(role: Role) {
    const users = this.items.filter((item) => item.role === role)
    return users
  }

}