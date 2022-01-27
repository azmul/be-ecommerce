import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import { pick, get } from "lodash";
import { log } from "../logger/logging";
import Admin from "../models/admin";
import bcrypt from "bcrypt";
import ROLE from "../constant/roleConstant";

export async function getAdminHandler(req: Request, res: Response) {
  try {
    const admins = await Admin.find()
      .sort({ createdAt: -1 })
    res.status(200).send({
      data: admins,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function registerAdminHandler(req: Request, res: Response) {
  try {
    const { name, phone, password } = req.body;

    const admin = await Admin.findOne({ phone });
    if (admin)
      return res
        .status(400)
        .send({ status: 400, message: "You already registered." });

    if (name && phone && password) {
      let admin = new Admin({ ...req.body, role: ROLE.ADMIN_ROLE, is_approved: false });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const response = pick(admin, ["name", "phone"]);
      res.status(201).send(response);
    } else {
      res.status(400).send({ status: 400, message: "Not Valid Information" });
    }
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function loginAdminHandler(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;
    const admin = await Admin.findOne({ phone });
    if (!admin)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid phone or password." });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid phone or password." });

    const token: string = admin.generateAuthToken();

    res
      .header("x-auth-token", token)
      .status(200)
      .send({
        data: pick(admin, ["_id", "name", "phone", "is_approved", "role"]),
        token,
      });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function recoverPasswordAdminHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const { phone, password } = req.body;
    const admin = await Admin.findOne({ phone });
    if (!admin)
      return res.status(400).send({ message: "Phone Number not found" });

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    await Admin.findByIdAndUpdate(admin._id, { password: newPassword });
    res.status(200).send({ status: 200, phone });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function changePasswordAdminHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const userId = get(req, "user._id");
    const phone = get(req, "user.phone");
    const { password, confirm, current } = req.body;

    if (password !== confirm) {
      res.status(400).send({
        status: 400,
        message: "New password and confirm password are not same",
      });
    }

    let admin = await Admin.findOne({ phone });
    if (!admin)
      return res.status(404).send({ status: 404, message: "admin not found" });

    const isCurrent = await bcrypt.compare(current, admin.password);

    if (!isCurrent) {
      res
        .status(400)
        .send({ status: 400, message: "Providing Current password is wrong" });
    }

    const isSame = await bcrypt.compare(password, admin.password);

    if (isSame) {
      res
        .status(400)
        .send({ status: 400, message: "Old password and new password same" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await Admin.findByIdAndUpdate(userId, { password: newPassword });
      res.status(200).send({ message: "Password Successfully Changed" });
    }
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
