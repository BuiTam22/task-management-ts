import {Router, Request, Response} from "express";
const router: Router = Router();
import Task from "../../../models/task.model";

// [GET] /tasks/api/v1
router.get("/", async (req: Request, res: Response) =>{
    const tasks = await Task.find({
        deleted: false
    });
    res.json(tasks);
});


// [GET] /tasks/api/v1/:id
router.get("/detail/:id", async (req: Request, res: Response) =>{
    const id: string = req.params.id;
    const task = await Task.find({
        _id: id,
        deleted: false
    });
    res.json(task);
});

export const taskRoutes: Router = router;