import { Request, Response} from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import mongodb from "mongodb";
import { pick } from "lodash";
import { log } from "../logger/logging";
import Blog from '../models/blog';
import API  from "../constant/apiContant"

const ObjectId: any = mongodb.ObjectId;

export async function getAllBlogsHandler(req: Request, res: Response) {
    const { last_id } = req.query;

    let query: any = {};
    let countQuery: any = {};

    if(last_id) {
        query = {...countQuery, '_id': {'$gt':new ObjectId(last_id)}};
    } else {
        query = {...countQuery };
    }

    delete query.last_id;
    delete countQuery.last_id;

    try {
        const blogs = await Blog.find(query, {creator_id: 0, creator_role: 0, content: 0}).limit(API.DEFAULT_DATA_PER_PAGE);
        const total = await Blog.find(countQuery).countDocuments()

        res.status(200).send(
            {
                data: blogs,
                meta: {
                    total
                }
            }
        );
    } catch (error) {
        res.status(500).send({ status:500, message: error});
    }
}

export async function getBlogHandler(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const blog = await Blog.findById(id, {creator_id: 0, creator_name: 0, creator_role: 0, creator_specialist:0, creator_institution: 0, creator_picture_url: 0, createdAt: 0});
        if (!blog) return res.status(404).send('The Blog with the given id was not found');

        res.status(200).send(blog);
    } catch(err: any) {
        log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function createBlogHandler(req: IGetUserAuthInfoRequest, res: Response) {
    try {
        let blog = new Blog(pick(req.body, ['title', 'content', 'creator_id', 'creator_name', 'creator_role', 'creator_specialist', 'creator_institution', 'creator_picture_url']));
        await blog.save();
        res.status(201).send({message: 'Blog Created', status: 201});
    } catch(err: any) {
        log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function updateBlogHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
    const { title, content } = req.body;

    try {
        const blog = await Blog.findByIdAndUpdate(id, { title, content });
        if (!blog) return res.status(404).send('The Doctor with the given id was not found');

        res.status(200).send({message: 'Blog Updated'});
    } catch(err: any) {
        log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function getBlogsByCreatorHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const id = req.params.id;
    const { last_id } = req.query;

    let query: any = {};
    let countQuery: any = {creator_id: id};

    if(last_id) {
        query = {...countQuery, '_id': {'$gt':new ObjectId(last_id)}};
    } else {
        query = {...countQuery };
    }

    delete query.last_id;
    delete countQuery.last_id;

    try {
        const blogs = await Blog.find(query, {creator_id: 0, creator_role: 0, content: 0 }).limit(API.DEFAULT_DATA_PER_PAGE);
        const total = await Blog.find(countQuery).countDocuments()

        res.status(200).send(
            {
                data: blogs,
                meta: {
                    total
                }
            }
        );
    } catch(err: any) {
        log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}