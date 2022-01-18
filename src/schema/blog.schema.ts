import { object, string } from "yup";

export const createSchema = object({
  body: object({
    title: string().required("title is required"),
    content: string().required("content is required"),
    creator_name: string().required("creator_name is required"),
    picture_url: string().required("picture_url is required"),
    category: string().required("category is required"),
  }),
});

export const updateSchema = object({
  body: object({
    title: string().required("title is required"),
    content: string().required("content is required"),
    creator_name: string().required("creator_name is required"),
    picture_url: string().required("picture_url is required"),
    category: string().required("category is required"),
  }),
});
