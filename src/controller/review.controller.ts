import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { log } from "../logger/logging";
import Review from "../models/review";
import API from "../constant/apiContant";
import { numericCode } from "numeric-code";

const ObjectId: any = mongodb.ObjectId;

export async function getAllReviewsHandler(req: Request, res: Response) {
  const {
    current = 1,
    pageSize = API.DEFAULT_DATA_PER_PAGE,
    startDate,
    endDate,
  } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);

  const skipFields = {
    reviews: 0,
  };

  const query: any = {};
  if (startDate && endDate) {
    const start: any = startDate;
    const end: any = endDate;
    if (start && end) {
      query.updatedAt = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }
  }

  try {
    const reviews = await Review.find(query, skipFields)
      .sort({ updatedAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await Review.find(query).countDocuments();

    res.status(200).send({
      data: reviews,
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

export async function getReviewByProductIdHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const review = await Review.findOne({ product_numeric_id: Number(id) });
    res.status(200).send(review);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getReviewHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const review = await Review.findById(id);
    res.status(200).send(review);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createReviewHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    const review = new Review({
      ...req.body,
      id: numericCode(14),
    });
    await review.save();
    res.status(201).send({ message: "Review Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateReviewHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const reviewId = req.params.id;

  try {
    const {
      ans,
      id,
      customerPhone,
      customerName,
      rating,
      isApproved,
      message,
      isDeleted,
    } = req.body;

    const item = await Review.findById(reviewId);
    if (!item)
      return res.status(404).send("The review with the given id was not found");
    const reviews: any = item.reviews;

    const reviewIndex = reviews.findIndex(
      (review: any) => Number(review.id) === Number(id)
    );

    if (!!isDeleted) {
      if (reviewIndex !== -1) {
        reviews.splice(reviewIndex, 1);
      } else {
        res.status(400).send({ message: "Not Deleted" });
      }
    } else {
      if (reviewIndex === -1) {
        if (customerName && customerPhone && message && reviewId) {
          reviews.unshift({
            customerName,
            ansTime: null,
            isAns: false,
            ans: null,
            customerPhone,
            message,
            rating,
            isApproved: false,
            id,
            createdAt: new Date(),
          });
        } else {
          res.status(400).send({ message: "Bad Request" });
        }
      } else {
        if (ans) {
          reviews[reviewIndex].isAns = true;
          reviews[reviewIndex].ans = ans;
          reviews[reviewIndex].ansTime = new Date();
        }
        if (isApproved) {
          reviews[reviewIndex].isApproved = true;
        }
      }
    }

    await Review.findByIdAndUpdate(reviewId, { reviews: reviews });
    res.status(200).send({ message: "review Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
