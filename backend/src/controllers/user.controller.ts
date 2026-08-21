import type { Request, Response, NextFunction } from "express";
import type { UserDTO } from "../repositories/user.repository.js";
import type UserService from "../services/user.service.js";

export default class UserController {
  constructor(private userService: UserService) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const userDTO: UserDTO = {
        email,
        password,
      };
      const user = await this.userService.createUser(userDTO);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const userDTO: UserDTO = {
        email,
        password,
      };
      const response = await this.userService.login(userDTO);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  //Created for developer
  async findAllUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await this.userService.findAllUser();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.userService.deleteAllUser();
      res.json({message: "All users deleted"});
    } catch (error) {
      next(error);
    }
  }
}
