import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Testimonial from "../models/testimonial";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllTestimonialsHandler(req: Request, res: Response) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);
  
  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    updatedAt: 0,
  }; 

  try {
    const items = await Testimonial.find({}, skipFields).skip(skips).sort({createdAt: -1}).limit(
      Number(pageSize)
    );
    const total = await Testimonial.find().countDocuments();

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

export async function getTestimonialHandler(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const item = await Testimonial.findById(id);
    if (!item)
      return res
        .status(404)
        .send("The Testimonial with the given id was not found");

    res.status(200).send(item);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createTestimonialHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    let item = new Testimonial({
      ...req.body,
    });
    await item.save();
    res.status(201).send({ message: "Testimonial Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateTestimonialHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const item = await Testimonial.findByIdAndUpdate(id, { ...req.body });
    if (!item)
      return res
        .status(404)
        .send("The Testimonial with the given id was not found");

    res.status(200).send({ message: "Testimonial Updated", data: item });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteTestimonialHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    await Testimonial.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({ message: "Deleted" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
