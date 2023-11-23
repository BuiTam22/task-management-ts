import { taskRoutes } from "./task.route";
import {Express} from "express";
const mainV1Route = (app: Express) =>{
    const version: string = "/api/v1";

    app.use(version + "/tasks", taskRoutes);
}

export default mainV1Route;