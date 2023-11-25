import { Request, Response } from "express";

import Task from "../models/task.model";


// [GET] /tasks/api/v1
export const index = async (req: Request, res: Response) => {
  interface Find{
    deteted: boolean,
    status?: string
  }
  const find = {
    deleted: false
  }
  if(req.query.status){
    find["status"] = req.query.status; // add thuộc tính khác với js find.status(báo lỗi)
  }
  const tasks = await Task.find(find);

  res.json(tasks);
}


// [GET] /tasks/api/v1/:id
export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
}




