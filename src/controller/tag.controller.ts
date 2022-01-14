import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Tag from "../models/tag";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllTagsHandler(req: Request, res: Response) {
  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    updatedAt: 0,
    createdAt: 0,
    is_active: 0,
    _id: 0,
  }; 
  try {
    const tags = await Tag.find({is_active: true}, skipFields).sort({createdAt: -1});
    res.status(200).send({
      data: tags,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getTagsHandler(req: Request, res: Response) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);
  
  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    updatedAt: 0,
  }; 
  try {
    const tags = await Tag.find({}, skipFields).sort({createdAt: -1}).skip(skips).limit(Number(pageSize));
    const total = await Tag.find().countDocuments();

    res.status(200).send({
      data: tags,
      pagination: {
        total,
        pageSize,
        current,
      },
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getTagHandler(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const tag = await Tag.findById(id);
    if (!tag)
      return res.status(404).send("The Tag with the given id was not found");

    res.status(200).send(tag);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createTagHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const { name, name_local } = req.body;
  if (!name && !name_local) return res.status(400).send({ status: 400, message: "Name is required" });

  try {
    let tag = new Tag({name, name_local, number_id: Math.floor(Math.random() * 999)});
    await tag.save();
    res.status(201).send({ message: "Tag Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateTagHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;
  const { name, name_local } = req.body;
  if (!name && !name_local) return res.status(400).send({ status: 400, message: "Name is required" });

  try {
    const tag = await Tag.findByIdAndUpdate(id, { ...req.body });
    if (!tag)
      return res.status(404).send("The Tag with the given id was not found");

    res.status(200).send({ message: "Tag Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteTagHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
  
    try {
      await Tag.deleteOne({ _id: ObjectId(id) });
      res.status(200).send({ message: "Deleted" });
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
  }