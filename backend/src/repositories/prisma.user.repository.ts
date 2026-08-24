import type { PrismaClient } from "@prisma/client";
import type { UserDTO, UserRepository } from "./user.repository.js";

export default class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { productsCart: true },
    });
  }

  async createUser(user: UserDTO) {
    return this.prisma.user.create({ data: user });
  }

  //Created for developer
  async findAllUser() {
    return this.prisma.user.findMany({ include: { productsCart: true } });
  }

  async deleteAllUser(): Promise<void> {
    await this.prisma.productCart.deleteMany();
    await this.prisma.user.deleteMany();
  }
}
