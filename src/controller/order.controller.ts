import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Order from "../models/order";
import API from "../constant/apiContant";
import { numericCode } from "numeric-code";

const ObjectId: any = mongodb.ObjectId;

export async function getAllOrdersHandler(req: Request, res: Response) {
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
    const items = await Order.find(query).limit(API.DEFAULT_DATA_PER_PAGE);
    const total = await Order.find(countQuery).countDocuments();

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

export async function getOrderHandler(req: Request, res: Response) {
    const id = req.params.id;
    const { isNumeric } = req.query;
    try {
      const item = !isNumeric
        ? await Order.findById(id)
        : await Order.findOne({ id: Number(id) });
      if (!item)
        return res
          .status(404)
          .send("The Order with the given id was not found");
  
      res.status(200).send(item);
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
}

export async function createOrderHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    let item = new Order({...req.body, id: numericCode(6) });
    await item.save();
    res.status(201).send({ message: "Order Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateOrderHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const item = await Order.findByIdAndUpdate(id, { ...req.body });
    if (!item)
      return res.status(404).send("The Order with the given id was not found");

    res.status(200).send({ message: "Order Updated", data: item });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteOrderHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
  
    try {
        const item = await Order.findByIdAndUpdate(id, { is_active: false });
        if (!item) return res.status(404).send('The Order with the given id was not found');
        
        res.status(200).send({ message: "Deactivated"});
    } catch(err: any){
      log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
  }