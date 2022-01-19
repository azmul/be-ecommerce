import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { cloneDeep } from "lodash";
import { log } from "../logger/logging";
import Blog from "../models/blog";
import API from "../constant/apiContant";
import { numericCode } from "numeric-code";

const ObjectId: any = mongodb.ObjectId;

export async function getRecentBlogsHandler(req: Request, res: Response) {
  try {
    const blogs = await Blog.find({ is_active: true }, { content: 0 })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).send({
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getAdminAllBlogsHandler(req: Request, res: Response) {
  const {
    current = 1,
    pageSize = API.DEFAULT_DATA_PER_PAGE,
    startDate,
    endDate,
  } = req.query;

  const skips = Number(pageSize) * (Number(current) - 1);

  const skipFields = {
    content: 0,
    title_local: 0,
    content_local: 0,
    picture_url: 0,
    comment: 0,
    last_updated_by: 0,
    createdAt: 0,
    comments: 0,
    like_count: 0,
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
    const blogs = await Blog.find(query, skipFields)
      .sort({ updatedAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await Blog.find().countDocuments();

    res.status(200).send({
      data: blogs,
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

export async function getAllBlogsHandler(req: Request, res: Response) {
  const { current = 1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;

  const skips = Number(pageSize) * (Number(current) - 1);

  const skipFields = {
    comment: 0,
    last_updated_by: 0,
    updatedAt: 0,
    comments: 0,
    like_count: 0,
  };

  try {
    const blogs = await Blog.find({ is_active: true }, skipFields)
      .sort({ updatedAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await Blog.find().countDocuments();

    res.status(200).send({
      data: blogs,
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

export async function getBlogHandler(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const blog = isNaN(Number(id))
      ? await Blog.findById(id)
      : await Blog.findOne({ id: Number(id) });
    if (!blog)
      return res.status(404).send("The Blog with the given id was not found");

    res.status(200).send(blog);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function createBlogHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  try {
    let blog = new Blog({ ...req.body, id: numericCode(8) });
    await blog.save();
    res.status(201).send({ message: "Blog Created", status: 201 });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateBlogHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body });
    if (!blog)
      return res.status(404).send("The Blog with the given id was not found");

    res.status(200).send({ message: "Blog Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function updateBlogCommentHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const {
      blogId,
      customerPhone,
      customerName,
      isApproved,
      comment,
      isDeleted,
    } = req.body;

    const item = await Blog.findById(id);
    if (!item)
      return res
        .status(404)
        .send("The comment with the given id was not found");
    const comments: any = cloneDeep(item.comments);

    const commentsIndex = comments.findIndex(
      (blog: any) => Number(blog.id) === Number(blogId)
    );

    if (!!isDeleted) {
      comments.splice(commentsIndex, 1);
    } else {
      if (commentsIndex === -1) {
        comments.unshift({
          customerName,
          customerPhone,
          comment,
          isApproved: false,
          id: numericCode(6),
          createdAt: new Date(),
        });
      } else {
        comments[commentsIndex].comment = comment;
        if (isApproved) {
          comments[commentsIndex].isApproved = true;
        }
      }
    }
    await Blog.findByIdAndUpdate(id, { comments: comments });
    res.status(200).send({ message: "comment Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function deleteBlogHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    await Blog.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({ message: "Deleted" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}
