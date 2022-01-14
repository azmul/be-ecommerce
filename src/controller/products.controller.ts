import { Request, Response } from "express";
import mongodb from "mongodb";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import Product from "../models/product";
import { log } from "../logger/logging";
import { numericCode } from "numeric-code";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllProducts(req: Request, res: Response) {
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
    const products = await Product.find(query).sort({createdAt: -1}).limit(API.DEFAULT_DATA_PER_PAGE);
    const total = await Product.find(countQuery).countDocuments();

    res.status(200).send({
      data: products,
      meta: {
        total: total,
      },
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function createProductHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    let product = new Product({ ...req.body, id: numericCode(6) });
    await product.save();
    res.status(201).send({ message: "Product Created", data: product });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getProductHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const product = isNaN(Number(id))
      ? await Product.findById(id)
      : await Product.findOne({ id: Number(id) });
    if (!product)
      return res
        .status(404)
        .send("The Product with the given id was not found");

    res.status(200).send(product);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateProductHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate(id, { ...req.body });
    if (!product)
      return res
        .status(404)
        .send("The product with the given id was not found");

    res.status(200).send({ message: "product Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteProductHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    await Product.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({ message: "Deleted" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
