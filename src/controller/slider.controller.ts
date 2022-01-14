import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Slider from "../models/slider";
import API from "../constant/apiContant";

const ObjectId: any = mongodb.ObjectId;

export async function getAllSlidersHandler(req: Request, res: Response) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);
  
  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    updatedAt: 0,
  }; 

  try {
    const sliders = await Slider.find({}, skipFields).sort({createdAt: -1}).skip(skips).limit(Number(pageSize));
    const total = await Slider.find().countDocuments();

    res.status(200).send({
      data: sliders,
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

export async function getSliderHandler(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const slider = await Slider.findById(id);
    if (!slider)
      return res.status(404).send("The slider with the given id was not found");

    res.status(200).send(slider);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createSliderHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    let slider = new Slider({...req.body});
    await slider.save();
    res.status(201).send({ message: "slider Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateSliderHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const slider = await Slider.findByIdAndUpdate(id, { ...req.body });
    if (!slider)
      return res.status(404).send("The slider with the given id was not found");

    res.status(200).send({ message: "slider Updated", data: slider });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteSliderHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
  
    try {
      await Slider.deleteOne({ _id: ObjectId(id) });
      res.status(200).send({ message: "Deleted" });
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
  }