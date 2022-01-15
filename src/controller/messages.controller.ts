import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Messages from "../models/messages";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllMessagesHandler(req: Request, res: Response) {

  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE, startDate, endDate } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);
  
  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    updatedAt: 0,
  }; 

  const query: any = {};
  if (startDate && endDate) {
    const start: any = startDate;
    const end: any = endDate;
    query.createdAt = {
      $gte: new Date(start),
      $lt: new Date(end),
    };
  }

  try {
    const items = await Messages.find(query, skipFields).sort({createdAt: -1}).skip(skips).limit(Number(pageSize));
    const total = await Messages.find(query).countDocuments();

    res.status(200).send({
      data: items,
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