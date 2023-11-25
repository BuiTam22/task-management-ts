import { Request, Response } from "express";

import Task from "../models/task.model";


// [GET] /tasks/api/v1
export const index = async (req: Request, res: Response) => {

  // Find
  interface Find{
    deleted: boolean,
    status?: string
  }
  const find:Find = {
    deleted: false
  }
  if(req.query.status){
    find.status = req.query.status.toString(); // add thuộc tính khác với js find.status(báo lỗi)
  }

  // Cách 2
  // if(req.query.status){
  //   find["status"] = req.query.status.toString(); // add thuộc tính khác với js find.status(báo lỗi)
  // }
  // End Find


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




