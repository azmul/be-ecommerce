import { object, string, number } from "yup";

export const createSchema = object({
    body: object({
        title: string().required("title is required"),
        content: object().required("content is required"),
        creator_id: string().required("creator_id is required"),
        creator_name: string().required("creator_name is required"),
        creator_role: number().required("creator_role is required"),
        creator_specialist: string().required("creator_specialist is required"),
        creator_institution: string().required("creator_institution is required"),
        creator_picture_url: string().required("creator_picture_url is required")
    }),
  });

  export const updateSchema = object({
    body: object({
        title: string().required("title is required"),
        content: object().required("content is required"),
    }),
  });
