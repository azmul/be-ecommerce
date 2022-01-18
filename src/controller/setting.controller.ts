import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import { log } from "../logger/logging";
import Setting from "../models/setting";

export async function getSettingHandler(req: Request, res: Response) {
  try {
    const setting = await Setting.find({}, { createdAt: 0, _id: 0 });
    const response = setting && setting.length > 0 ? setting[0] : {};
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function createSettingHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const setting = await Setting.find();

    if (setting && setting.length === 0) {
      const newSetting = new Setting({ ...req.body });
      await newSetting.save();
    } else {
      const id = setting[0]._id;
      await Setting.findByIdAndUpdate(id, { ...req.body });
    }

    res.status(201).send({ message: "Setting Updated", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
