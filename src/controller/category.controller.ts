import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Category from "../models/category";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllCategorysHandler(req: Request, res: Response) {
  try {
    const categorys = await Category.find({is_active: true});
    res.status(200).send({
      data: categorys,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getCategorysHandler(req: Request, res: Response) {
  const { last_id } = req.query;

  let query: any = {};
  let countQuery: any = {};

  if (last_id) {
    query = { ...countQuery, _id: { $gt: new ObjectId(last_id) } };
  } else {
    query = { ...countQuery };
  }

  delete query.last_id;
  delete countQuery.last_id;

  try {
    const categorys = await Category.find(query).limit(API.DEFAULT_DATA_PER_PAGE);
    const total = await Category.find(countQuery).countDocuments();

    res.status(200).send({
      data: categorys,
      meta: {
        total,
      },
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getCategoryHandler(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).send("The category with the given id was not found");

    res.status(200).send(category);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createCategoryHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const { name, name_local } = req.body;
  if (!name && !name_local) res.status(400).send({ status: 400, message: "Name is required" });

  try {
    let category = new Category({name, name_local, number_id: Math.floor(Math.random() * 999)});
    await category.save();
    res.status(201).send({ message: "category Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateCategoryHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;
  const { name, name_local } = req.body;
  if (!name && !name_local) res.status(400).send({ status: 400, message: "Name is required" });

  try {
    const category = await Category.findByIdAndUpdate(id, { ...req.body });
    if (!category)
      return res.status(404).send("The category with the given id was not found");

    res.status(200).send({ message: "category Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteCategoryHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
  
    try {
      await Category.deleteOne({ _id: ObjectId(id) });
      res.status(200).send({ message: "Deleted" });
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
  }