import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Order from "../models/order";
import API from "../constant/apiContant";
import { numericCode } from "numeric-code";
import User from "../models/user";
import { phoneCheck } from "../utils/phone";
import products from "../routes/products";

const ObjectId: any = mongodb.ObjectId;

export async function createOrderHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const { userAddress } = req.body;
    const { phone, district, upazila, address } = userAddress;
    if (!phone) {
      return res
        .status(400)
        .send({ status: 400, message: "Please give phone number" });
    }
    let user = await User.findOne({ phone: phoneCheck(phone) });

    let order = new Order({
      ...req.body,
      id: numericCode(12),
      userRegistered: !!user,
    });
    await order.save();

    const infoUpdate: any = {};
    if (!user?.district) {
      infoUpdate.district = district;
    }
    if (!user?.upazila) {
      infoUpdate.upazila = upazila;
    }
    if (!user?.address) {
      infoUpdate.address = address;
    }

    if (user) {
      await User.findByIdAndUpdate(user._id, {
        orders: [...user.orders, order],
        ...infoUpdate,
      });
    }
    res.status(201).send({ message: "Order Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getAllOrdersHandler(req: Request, res: Response) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);
  
  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    products: 0,
    transactionId: 0,
    userAddress: 0,
    updatedAt: 0,
  }; 

  try {
    
    const orders = await Order.find({}, skipFields)
      .sort({ createdAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await Order.find().countDocuments();

    res.status(200).send({
      data: orders,
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

export async function getOrderHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const order = isNaN(Number(id))
      ? await Order.findById(id)
      : await Order.findOne({ id: Number(id) });
    if (!order)
      return res.status(404).send("The Order with the given id was not found");

    res.status(200).send(order);
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
    const { shippingStatus, customer_phone, order_id, comment } = req.body;

    if (!customer_phone) {
      return res
        .status(400)
        .send({ status: 400, message: "Please give customer phone number" });
    }

    let user = await User.findOne({ phone: phoneCheck(customer_phone) });

    const orders: any = user?.orders || [];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === order_id) {
        orders[i].shippingStatus = shippingStatus;
        break;
      }
    }

    if (!!user) {
      await User.findByIdAndUpdate(user._id, { orders: orders });
    }

    const order = await Order.findByIdAndUpdate(id, {
      shippingStatus,
      comment,
    });
    if (!order)
      return res.status(404).send("The Order with the given id was not found");

    res.status(200).send({ message: "Order Updated", data: order });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteOrderHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const order = await Order.findByIdAndUpdate(id, { is_active: false });
    if (!order)
      return res.status(404).send("The Order with the given id was not found");

    res.status(200).send({ message: "Deactivated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
