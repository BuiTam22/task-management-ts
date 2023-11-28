import { Request, Response } from "express";

import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

// [GET] /tasks/api/v1
export const index = async (req: Request, res: Response) => {

  // Find
  interface Find{
    deleted: boolean,
    status?: string, 
    title?: RegExp
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

  // Search
  if (req.query.keyword) {
    find.title = searchHelper(req.query).regex;
  }
  // End search

  // Sort 
  const sort = {};

  if(req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toLocaleString();
    sort[sortKey] = req.query.sortValue;
  }
  // End Sort

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2
  };

  const countTask:number = await Task.countDocuments(find);
  const objectPagination = paginationHelper(initPagination, req.query, countTask);

  // End Pagination

  const tasks = await Task.find(find)
  .sort(sort) 
  // hàm limit là số lượng tối đa của 1 page
  .limit(objectPagination.limitItems)
  // hàm skip là số lượng phần tử cần phải bỏ qua để bắt đầu 1 trang
  .skip(objectPagination.skip);

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


// [PATCH] /tasks/apt/v1/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;

    await Task.updateOne({ _id: id }, { status: status });
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }

}


// [PATCH] /tasks/api/v1/change-multi
export const changeMulti = async (req: Request, res: Response) =>{
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;
    
    switch(key){
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids }
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
        break;
      
      default:
        res.json({
          code:400,
          message: "Không tồn tại!"
        });
        break;
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Không hợp lệ!"
    });
  }
}


// [POST] /tasks/api/v1/create
export const create = async(req: Request, res: Response) =>{
  try {
    const task = new Task(req.body);
    await task.save();

    res.json({
      code:200,
      message: "Thêm thành công sản công việc!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không hợp lệ!"
    });
  }
}


// [PATCH] /tasks/api/v1/edit/:id
export const edit = async(req:Request, res:Response)=>{
  try {
    const id: string = req.params.id;
    await Task.updateOne({_id:id}, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Không hợp lệ!"
    });
  }
}




