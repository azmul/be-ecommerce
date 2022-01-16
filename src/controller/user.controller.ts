import { Response } from "express";
import mongodb from "mongodb";
import { numericCode } from "numeric-code";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import { pick } from "lodash";
import { log } from "../logger/logging";
import User from "../models/user";
import bcrypt from "bcrypt";
import Cloudinary from "../utils/cloudinary";
import API from "../constant/apiContant";
import { phoneCheck } from "../utils/phone";

const ObjectId: any = mongodb.ObjectId;

export async function registerUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const { password, phone, name } = req.body;
    if (!phone) {
      return res
        .status(400)
        .send({ status: 400, message: "Provide phone number" });
    }

    let isUser = await User.findOne({ phone: phoneCheck(phone) });

    if (!!isUser) {
      return res.status(400).send({ message: "User already registered" });
    }

    let user = new User({
      id: numericCode(6),
      password,
      phone: phoneCheck(phone),
      name,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const response = pick(user, ["id", "name", "phone"]);
    res.status(201).send(response);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function loginUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const { phone, password } = req.body;
    if (!phone) {
      return res
        .status(400)
        .send({ status: 400, message: "Provide phone number" });
    }
    let user = await User.findOne({ phone: phoneCheck(phone) });
    if (!user)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid phone number." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid password." });

    if (!user.is_active) {
      return res.status(400).send({
        status: 400,
        message: "You are not availabale now!. Please contact with Admin",
      });
    }

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send({
        data: pick(user, [
          "_id",
          "id",
          "picture_url",
          "name",
          "phone",
          "gender",
          "birth_day",
          "email",
          "district",
          "upazila",
          "address",
          "post_code",
          "is_active",
          "orders",
        ]),
        token,
      });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function profileUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const id: any = req?.user?._id;
    if (!id)
      return res.status(400).send({ status: 400, message: "Id not found" });

    const user = await User.findById(id).select("-password");
    res.status(200).send(user);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateProfileUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const id: any = req?.user?._id;
    if (!id)
      return res.status(400).send({ status: 400, message: "Id not found" });

    const { phone } = req.body;
    if (phone) {
      req.body.phone = phoneCheck(phone);
    }

    const user = await User.findByIdAndUpdate(id, { ...req.body });

    if (!user)
      return res.status(404).send({
        status: 404,
        message: "The user with the given id was not found",
      });

    const userUpdate = await User.findById(id).select("-password");
    res
      .status(200)
      .send({ data: userUpdate, message: "Profile updated successfully" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function recoverPasswordUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const { phone, password, code } = req.body;
    const user = await User.findOne({ phone });
    if (!user)
      return res.status(400).send({ message: "Phone Number not found" });

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(user._id, { password: newPassword });
    res.status(200).send({ status: 200, phone });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function changePasswordUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const id: any = req?.user?._id;
    if (!id)
      return res.status(400).send({ status: 400, message: "Id not found" });

    const phone: any = req?.user?.phone;
    if (!phone)
      return res.status(400).send({ status: 400, message: "Phone not found" });

    const { password, confirm, current } = req.body;

    if (password !== confirm) {
      return res.status(400).send({
        status: 400,
        message: "New password and confirm password are not same",
      });
    }

    let user = await User.findOne({ phone });
    if (!user)
      return res.status(404).send({ status: 404, message: "user not found" });

    const isCurrent = await bcrypt.compare(current, user.password);

    if (!isCurrent) {
      return res
        .status(400)
        .send({ status: 400, message: "Providing Current password is wrong" });
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      return res
        .status(400)
        .send({ status: 400, message: "Old password and new password same" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(id, { password: newPassword });
      res.status(200).send({ message: "Password Successfully Changed" });
    }
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function uploadImageUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const id: any = req?.user?._id;
    if (!id)
      return res.status(400).send({ status: 400, message: "Id not found" });

    const isuser = await User.findById(id);

    if (isuser) {
      const { imageData } = req.body;
      const uploadResponse = await Cloudinary.uploader.upload(imageData, {
        upload_preset: "users",
      });

      await User.findByIdAndUpdate(id, {
        picture_url: uploadResponse.public_id,
      });

      const userUpdate = await User.findById(id).select("-password");
      res.status(200).send({
        data: userUpdate,
        message: "Profile image updated successfully",
      });
    } else {
      return res.status(404).send({ status: 404, message: "user not found" });
    }
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getAllUsersHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE, startDate, endDate } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);

  const skipFields = {
    picture_url: 0,
    password: 0,
    address: 0,
    post_code: 0,
    orders: 0,
    email: 0,
    birth_day: 0,
    updatedAt: 0,
  };

  const query: any = {};
  if (startDate && endDate) {
    const start: any = startDate;
    const end: any = endDate;
    if(start && end) {
      query.createdAt = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }
  }

  try {
    const users = await User.find(query, skipFields)
      .sort({ createdAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await User.find(query).countDocuments();

    res.status(200).send({
      data: users,
      pagination: {
        total,
        pageSize,
        current,
      },
    });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getAllUsersByAdminHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE, startDate, endDate } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);

  const skipFields = {
    picture_url: 0,
    password: 0,
    address: 0,
    post_code: 0,
    orders: 0,
    email: 0,
    birth_day: 0,
    updatedAt: 0,
  };

  const query: any = {};
  if (startDate && endDate) {
    const start: any = startDate;
    const end: any = endDate;
    query.createdAt = {
      $gte: new Date(start),
      $lt: new Date(end),
    };
  }

  try {
    const users = await User.find(query, skipFields)
      .sort({ createdAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await User.find(query).countDocuments();

    res.status(200).send({
      data: users,
      pagination: {
        total,
        pageSize,
        current,
      },
    });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getActiveUsersHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const { is_active } = req.body;
    const users = await User.find({ is_active });
    res.status(200).send(users);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getSingleUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    if (!user)
      return res.status(404).send("The user with the given id was not found");

    res.status(200).send(user);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getSingleUserByAdminHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;
  if (!id) return res.status(404).send({ message: "The id was not correct" });

  try {
    const user = isNaN(Number(id))
      ? await User.findById(id).select("-password")
      : await User.findOne({ id: Number(id) }).select("-password");
    if (!user)
      return res
        .status(404)
        .send({ message: "The user with the given id was not found" });

    res.status(200).send(user);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, { is_active: false });
    if (!user)
      return res.status(404).send("The user with the given id was not found");

    res.status(200).send(user);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function activeUserHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, { is_active: true });
    if (!user)
      return res.status(404).send("The user with the given id was not found");

    res.status(200).send(user);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
