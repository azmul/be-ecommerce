import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Messages from "../models/messages";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllMessagesHandler(req: Request, res: Response) {
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
    const items = await Messages.find(query).limit(API.DEFAULT_DATA_PER_PAGE);
    const total = await Messages.find(countQuery).countDocuments();

    res.status(200).send({
      data: items,
      meta: {
        total,
      },
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getMessageHandler(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const item = await Messages.findById(id);
    if (!item)
      return res.status(404).send("The Message with the given id was not found");

    res.status(200).send(item);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createMessageHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    let item = new Messages({...req.body });
    await item.save();
    res.status(201).send({ message: "Message Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateMessageHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const item = await Messages.findByIdAndUpdate(id, { ...req.body });
    if (!item)
      return res.status(404).send("The Message with the given id was not found");

    res.status(200).send({ message: "Message Updated", data: item });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteMessageHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
  
    try {
        const item = await Messages.findByIdAndUpdate(id, { is_active: false });
        if (!item) return res.status(404).send('The Message with the given id was not found');
        
        res.status(200).send({ message: "Deactivated"});
    } catch(err: any){
      log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
  }