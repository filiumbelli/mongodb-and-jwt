import { Request, Response, Router } from "express";
import logger from 'winston'; // this retrieves default logger which was configured in log.js
const baseUrl = "/api/users";
const userRouter = Router();


userRouter.get(`${baseUrl}`,UserController.usersGet);
userRouter.get(`${baseUrl}/:id`,UserController.userDetailGet);
userRouter.put(`${baseUrl}/:id`,UserController.userUpdate);
userRouter.delete(`${baseUrl}/:id`, UserController.userDelete);
userRouter.post(`${baseUrl}`,UserController.userSave);

export default userRouter;