import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from "../middlewares/http-exception.middleware.js";
import type { UserDTO, UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: UserDTO) {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists != null) {
      throw new ConflictException("User email already exists!");
    }
    const hashPassword = await bcrypt.hash(user.password, 10);
    return this.userRepository.createUser({
      ...user,
      password: hashPassword,
    });
  }

  async login(user: UserDTO) {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists == null) {
      throw new UnauthorizedException("Invalid credentials!");
    }
    const passwordMatch = await bcrypt.compare(
      user.password,
      userExists.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException("Invalid credentials!");
    }
    const token = jwt.sign(
      {sub: userExists.id},
      process.env.JWT_SECRET!,
      {expiresIn: "1d"},
    );
    userExists.password = "";
    return {userExists, token};
  }

  //Created for developer
  async findAllUser(){
    return this.userRepository.findAllUser();
  }

  async deleteAllUser(){
    return this.userRepository.deleteAllUser();
  }
}
