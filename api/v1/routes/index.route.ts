import { taskRoutes } from "./task.route";
import {Express} from "express";
import { userRoutes } from "./user.route";
import * as authMiddleware from "../middlewares/auth.middleware";
const mainV1Route = (app: Express) =>{
    const version: string = "/api/v1";

    app.use(version + "/tasks", authMiddleware.requireAuth, taskRoutes);

    app.use(`${version}/users`, userRoutes);
}

export default mainV1Route;