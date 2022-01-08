import { Request, Response } from "express";
import { log } from "../logger/logging";
import Cloudinary from  '../utils/cloudinary'

export async function saveImagehandler(req: Request, res: Response) {
  try {
    const { image_data, upload_preset } = req.body;
    if(!image_data && !upload_preset) {
        res.status(400).send({ status: 400, message: "Image Data not Found" });
    }
    const uploadResponse = await Cloudinary.uploader.upload(image_data, {
        upload_preset
    });
    res.status(200).send({url: uploadResponse.secure_url, public_id: uploadResponse.public_id, uid:uploadResponse.asset_id,
    name: uploadResponse.public_id});
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function destroyImagehandler(req: Request, res: Response) {
    try {
      const { public_id } = req.body;
      if(!public_id) {
          res.status(400).send({ status: 400, message: "public_id  not Found" });
      }
      await Cloudinary.uploader.destroy(public_id, async(err: any, result: any) => {
          if(err) throw err;
          res.status(200).send({ message: "Image deleted" , data: result});

      });

    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
  }
