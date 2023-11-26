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




