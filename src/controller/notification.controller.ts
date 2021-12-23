import { Response } from "express";
import { get } from "lodash";
import { log } from "../logger/logging";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import Notification from "../models/notification";

import API from "../constant/apiContant"

export async function getAllNotificationsHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const userId = get(req, "user._id");
    if(!userId) res.status(400).send({status: 400, message: 'Id not found'});

    let query: any = { user_id: userId};

    const { current =  1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;
    const skips = Number(pageSize) * (Number(current) - 1);

    try {
        const skipFields = {picture_url: 0, updatedAt: 0};

        const notifications = await Notification.find(query, skipFields).sort({createdAt: -1}).skip(skips).limit(Number(pageSize));
        const total = await Notification.find(query).countDocuments()

        res.status(200).send(
            {
                data: notifications,
                pagination: {
                    total,
                    pageSize: API.DEFAULT_DATA_PER_PAGE,
                    current: Number(current),
                }
            }
        );
    } catch(err: any){
        log.error(err);
        res.status(400).send({status: 400, message: err?.message});
      }
}