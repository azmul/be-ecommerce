import { object, string, number, boolean } from "yup";

export const createReviewSchema = object({
    body: object({
      product_name: string().required("product_name is required"),
      product_id: string().required("product_id is required"),
      product_image: string(),
      product_numeric_id: number().required("product_numeric_id is required"),
    }),
  });

  export const updateReviewSchema = object({
    body: object({
      customerName: string().required("customerName is required"),
      customerPhone: string().required("customerPhone is required"),
      isApproved: boolean().required("isApproved is required"),
      rating: number().required("rating is required"),
      reviewId: number().required("reviewId is required"),
    }),
  });