import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import PrismaUserRepository from "../repositories/prisma.user.repository.js";
import UserService from "../services/user.service.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", (req, res, next) => {
  userController.createUser(req, res, next);
});

router.post("/login", (req, res, next) => {
  userController.login(req, res, next);
});

//Created for developer
router.get("/allUser", (req, res, next) => {
  userController.findAllUser(req, res, next);
});

router.delete("/allUser", (req, res, next) => {
  userController.deleteAllUser(req, res, next);
});

export { router as userRoutes };
