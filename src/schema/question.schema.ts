import { object, string, number } from "yup";

export const createQuestionSchema = object({
    body: object({
      product_name: string().required("product_name is required"),
      product_id: string().required("product_id is required"),
      product_image: string(),
      product_numeric_id: number().required("product_numeric_id is required"),
    }),
  });

  export const updateQuestionSchema = object({
    body: object({
      customerName: string().required("customerName is required"),
      customerPhone: string().required("customerPhone is required"),
      ques: string().required("ques is required")
    }),
  });