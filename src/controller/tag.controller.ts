import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Tag from "../models/tag";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllTagsHandler(req: Request, res: Response) {
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
    const tags = await Tag.find(query).limit(API.DEFAULT_DATA_PER_PAGE);
    const total = await Tag.find(countQuery).countDocuments();

    res.status(200).send({
      data: tags,
      meta: {
        total,
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
  const { name } = req.body;
  if (!name) res.status(400).send({ status: 400, message: "Name is required" });

  try {
    let tag = new Tag({name, tag_id: Math.floor(Math.random() * 999)});
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
  const { name } = req.body;

  try {
    const tag = await Tag.findByIdAndUpdate(id, { name });
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
        const tag = await Tag.findByIdAndUpdate(id, { is_active: false });
        if (!tag) return res.status(404).send('The Tag with the given id was not found');
        
        res.status(200).send({ message: "Deactivated"});
    } catch(err: any){
      log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
  }