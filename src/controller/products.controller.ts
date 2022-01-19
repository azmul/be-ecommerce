import { Request, Response } from "express";
import mongodb from "mongodb";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import Product from "../models/product";
import { log } from "../logger/logging";
import { numericCode } from "numeric-code";
import API from "../constant/apiContant";
import Review from "../models/review";
import Question from "../models/questions";

const ObjectId: any = mongodb.ObjectId;

export async function getAdminAllProducts(req: Request, res: Response) {

  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE, startDate, endDate } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);
  
  const skipFields = {
    category: 0,
    discount: 0,
    discount_local: 0,
    comment: 0,
    fullDescription: 0,
    fullDescription_local: 0,
    image: 0,
    images: 0,
    offerEnd: 0,
    offerEnd_local: 0,
    saleCount: 0,
    rating: 0,
    tag: 0,
    variation: 0,
    last_updated_by: 0,
  }; 

  const query: any = {};
  if (startDate && endDate) {
    const start: any = startDate;
    const end: any = endDate;
    if(start && end) {
      query.updatedAt = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }
  }

  try {
    const products = await Product.find(query, skipFields).sort({updatedAt: -1}).skip(skips).limit(Number(pageSize));
    const total = await Product.find(query).countDocuments();

    res.status(200).send({
      data: products,
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

export async function getAllProducts(req: Request, res: Response) {
  const skipFields = {
    comment: 0,
    images: 0,
    updatedAt: 0,
    createdAt: 0,
  }; 
  try {
    const products = await Product.find({}, skipFields).sort({createdAt: -1});
    const total = await Product.find().countDocuments();

    res.status(200).send({
      data: products,
      pagination: {
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

    const productInfo = {
      product_numeric_id: product.id,
      product_name: product.name,
      product_id: product._id,
      product_image: product.image[0]
    }

    const review = new Review({
      ...productInfo,
      id: numericCode(14)
    });
    await review.save();

    const question = new Question({
      ...productInfo,
      id: numericCode(14)
    });
    await question.save();

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
